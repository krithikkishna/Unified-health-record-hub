// addTestUser.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User.js'; // make sure this path is correct

dotenv.config();

const addUser = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const hashedPassword = await bcrypt.hash('password123', 10);

  const user = new User({
    email: 'krithikkrishna2304@gmail.com',
    password: hashedPassword,
    role: 'Admin',
  });

  await user.save();
  console.log('✅ Test user added');
  process.exit();
};

addUser().catch((err) => {
  console.error('❌ Error adding user:', err);
  process.exit(1);
});
