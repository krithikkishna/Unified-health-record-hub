import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import FHIR from 'fhir-kit-client';
import mongoose from 'mongoose';
import rateLimit from 'express-rate-limit';
import bcrypt from 'bcryptjs';

import { Blockchain } from './blockchain.js';
import { AesService } from './aesService.js';
import { KeyManagementService } from './keyManagement.js';
import { ClinicalPredictor } from './clinicalPredictor.js';
import { AuditLog } from './audit.js';

import authRoutes from './routes/auth.js';
import User from './models/User.js';

dotenv.config();

// Init Express
const app = express();

// CORS for frontend
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

// Middleware
app.use(helmet());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false }));

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests'
});
app.use(limiter);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB");
}).catch(err => {
  console.error("MongoDB connection error:", err);
});

// Initialize services
const fhirClient = new FHIR({
  baseUrl: process.env.FHIR_SERVER_URL,
  auth: { token: process.env.FHIR_TOKEN }
});
const blockchain = new Blockchain(process.env.BLOCKCHAIN_NETWORK);
const aesService = new AesService();
const keyManager = new KeyManagementService();
const predictor = new ClinicalPredictor();
const audit = new AuditLog();

// Auth Routes
app.use('/api', authRoutes);

// Temporary hardcoded login (no DB)
app.post('/api/login', (req, res) => {
  const { email, password, role } = req.body;

  const demoUser = {
    email: 'krithikrishna2304@gmail.com',
    password: '123456',
    role: 'Admin'
  };

  if (
    email === demoUser.email &&
    password === demoUser.password &&
    role === demoUser.role
  ) {
    return res.status(200).json({
      message: 'Login successful',
      token: 'demo-token',
      role: demoUser.role,
      email: demoUser.email
    });
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
});


// Patient Access
app.get('/api/patient/:id', async (req, res) => {
  try {
    const hasAccess = await blockchain.verifyAccess(
      req.headers['x-user-id'],
      'Patient',
      req.params.id,
      'read'
    );
    if (!hasAccess) return res.status(403).json({ error: 'Access denied' });

    const patient = await fhirClient.read({
      resourceType: 'Patient',
      id: req.params.id
    });
    const decrypted = await aesService.decryptResource(patient, req.headers['x-key-id']);

    await audit.log(req.headers['x-user-id'], 'PATIENT_ACCESS', {
      resourceId: req.params.id,
      ip: req.ip
    });

    res.json(decrypted);
  } catch (err) {
    handleError(res, err);
  }
});

// CKD Prediction
app.post('/api/predict/ckd', async (req, res) => {
  try {
    const { patientId, horizon = '6m' } = req.body;

    const canPredict = await blockchain.verifyAccess(
      req.headers['x-practitioner-id'],
      'Patient',
      patientId,
      'predict'
    );
    if (!canPredict) return res.status(403).json({ error: 'Prediction not authorized' });

    const prediction = await predictor.predictCKD(patientId, horizon);

    res.json({
      riskScore: prediction.riskScore,
      riskCategory: prediction.riskCategory,
      keyFactors: prediction.keyFactors
    });
  } catch (err) {
    handleError(res, err);
  }
});

// Key Rotation
app.post('/admin/keys/rotate', async (req, res) => {
  try {
    if (req.headers['x-admin-token'] !== process.env.ADMIN_TOKEN) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { keyId } = req.body;
    const newKey = await keyManager.rotateKey(keyId);

    res.json({
      newKeyId: newKey.keyId,
      status: 'rotated'
    });
  } catch (err) {
    handleError(res, err);
  }
});

// Global Error Handler
function handleError(res, err) {
  console.error(err);
  if (err.response?.data?.issue) {
    return res.status(400).json({
      error: 'FHIR Operation Failed',
      details: err.response.data.issue
    });
  }
  const statusCode = err.message.includes('Access denied') ? 403 :
                     err.message.includes('not found') ? 404 : 500;
  res.status(statusCode).json({ error: err.message || 'Internal Server Error' });
}

// Startup
(async () => {
  try {
    await keyManager.initialize();
    await predictor.loadModels();

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`UHRH Server running on port ${PORT}`);
      console.log(`FHIR Connected: ${process.env.FHIR_SERVER_URL}`);
    });
  } catch (err) {
    console.error('Fatal startup error:', err);
    process.exit(1);
  }
})();
