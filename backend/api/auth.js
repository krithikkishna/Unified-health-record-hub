const express = require('express');
const router = express.Router();
const cors = require('cors'); // You'll need to install this with npm

// Hardcoded users — production version should use a database
const users = [
  {
    role: 'Admin',
    email: 'krithikkrishna2304@gmail.com',
    password: '@Krithik_2304',
  },
  {
    role: 'Doctor',
    email: 'mageji007@gmail.com',
    password: '@Mahesh23',
  },
  {
    role: 'Patient',
    email: 'mohammedfardin.ds.ai@gmail.com',
    password: '@Fardin204',
  },
];

// Define your route on the router, not directly on Express app
// Temporarily switch to hardcoded users until MongoDB is working
app.post('/api/login', async (req, res) => {
  const { email, password, role } = req.body;
  
  // Hardcoded users for testing
  const users = [
    {
      role: 'Admin',
      email: 'krithikkrishna2304@gmail.com',
      password: '@Krithik_2304',
    },
    {
      role: 'Doctor',
      email: 'mageji007@gmail.com',
      password: '@Mahesh23',
    },
    {
      role: 'Patient',
      email: 'mohammedfardin.ds.ai@gmail.com',
      password: '@Fardin204',
    },
  ];
  
  try {
    // Find the user in our hardcoded list
    const user = users.find(
      (u) => u.email === email && u.password === password && u.role === role
    );
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const token = 'token-' + Date.now();
    return res.status(200).json({
      message: 'Login successful',
      token,
      role: user.role,
      email: user.email
    });
    
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: 'Internal server error' });
  }
});