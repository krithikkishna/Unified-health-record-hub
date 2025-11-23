import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const hashedPassword = await bcrypt.hash('@Krithik_2304', 10);

  await User.create({
    email: 'krithikkrishna2304@gmail.com',
    role: 'Admin',
    password: hashedPassword

  });

  console.log('Admin user created.');
  process.exit();
};

seed();
