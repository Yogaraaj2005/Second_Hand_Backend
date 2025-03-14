import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { title, price, image, description } = req.body;
    if (!title || !price || !image || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newProduct = await Product.create({ title, price, image, description, seller: req.user.id });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
