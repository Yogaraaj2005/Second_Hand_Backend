import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// Import Routes
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config(); // 🔹 Load environment variables

const app = express();

// 🔹 Middleware
app.use(express.json());

// 🔹 CORS Configuration (Allow only your frontend)
app.use(
  cors({
    origin: "https://unique-figolla-017148.netlify.app/" || "*", // Update .env with your frontend URL
    credentials: true, // Enables cookies if needed
  })
);



// 🔹 Connect to MongoDB
connectDB();

// 🔹 Define API Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

// 🔹 Health Check Route
app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

// 🔹 Error Handling Middleware (For better debugging)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// 🔹 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running on port ${PORT}, visit: http://localhost:${PORT}`)
);
