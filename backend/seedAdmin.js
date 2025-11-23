const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User"); // Adjust path if needed

mongoose.connect("mongodb://localhost:27017/UHRH", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedAdmin = async () => {
  const hashedPassword = await bcrypt.hash("admin123", 10);
  await User.create({
    email: "krithikrishna2304@gmail.com",
    password: hashedPassword,
    role: "Admin",
  });
  console.log("Admin user created.");
  mongoose.disconnect();
};

seedAdmin();
