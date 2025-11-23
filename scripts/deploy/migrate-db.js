// migrate-db.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

// Import your models
import User from './models/User.js';
import Patient from './models/Patient.js';
// Add more models as needed

const seedData = async () => {
  console.log('📦 Starting DB migration...');

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Connected to MongoDB');

    // Example: create default admin user
    const adminExists = await User.findOne({ role: 'admin' });
    if (!adminExists) {
      await User.create({
        username: 'admin',
        email: 'admin@uhrh.com',
        password: 'Admin@123', // hash it in production!
        role: 'admin',
      });
      console.log('👤 Default admin user created.');
    }

    // You can insert dummy patients, etc.
    // await Patient.create([...]);

    console.log('✅ Migration completed.');
  } catch (error) {
    console.error('❌ Migration failed:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedData();
