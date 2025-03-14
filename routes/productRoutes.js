import express from "express";
import { getProducts, getProductById, createProduct } from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public Routes
router.route("/").get(getProducts);
router.route("/:id").get(getProductById);

// Protected Routes (Only logged-in users can add products)
router.route("/").post(protect, createProduct);

export default router;
