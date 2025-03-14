import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// Import Routes
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config(); // 🔹 Load environment variables

const app = express();
app.use(express.json());
app.use(cors());

connectDB(); // 🔹 Connect to MongoDB

// 🔹 Define API Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

// 🔹 Health Check Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
