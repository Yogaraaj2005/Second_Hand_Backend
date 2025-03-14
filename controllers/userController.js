import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { generateToken } from "../config/auth.js"; // Assuming you already have a token utility

// **REGISTER USER**
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await User.create({ name, email, password: hashedPassword });

    if (!user) {
      return res.status(400).json({ message: "Invalid user data" });
    }

    res.status(201).json({
      message: "User registered successfully",
      user: { _id: user.id, name: user.name, email: user.email },
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// **LOGIN USER**
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid credentials"); // ✅ Corrected
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials"); // ✅ Corrected
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({
      message: "Login successful",
      user: { _id: user._id, name: user.name, email: user.email },
      token,
    });
  } catch (error) {
    res.status(401).json({ message: error.message }); // ✅ Returns error message properly
  }
};
