import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const connectDB = async () => {
  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      tls: true,
      authMechanism: 'SCRAM-SHA-1',
      connectTimeoutMS: 20000,
    };

    const caPath = path.resolve('./global-bundle.pem');
    if (fs.existsSync(caPath)) {
      options.tlsCAFile = caPath;
    }

    await mongoose.connect(process.env.MONGO_URI, options);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

export default connectDB;
