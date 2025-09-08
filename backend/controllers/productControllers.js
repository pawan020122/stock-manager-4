import Product from "../models/Product.js";

// Create product (user-specific)
export const createProduct = async (req, res) => {
  try {
    const { name, sku, description, price, quantity, type } = req.body;
    const product = await Product.create({
      name,
      sku,
      description,
      price,
      quantity,
      type,
      createdBy: req.user._id, // 👈 link product to user
    });
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get products (user-specific, unless admin)
export const getProducts = async (req, res) => {
  try {
    const query = req.user.role === "admin"
      ? {} // admin sees all
      : { createdBy: req.user._id }; // user sees only their own

    const products = await Product.find(query).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error("GET /products error:", err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single product (only if belongs to user OR admin)
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (req.user.role !== "admin" && product.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update product (only owner or admin)
export const updateProduct = async (req, res) => {
  try {
    const { name, quantity, price, type } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = name || product.name;
    product.quantity = quantity || product.quantity;
    product.price = price || product.price;
    product.type = type || product.type; // ✅ include type

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    console.error("Error updating product:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete product (only owner or admin)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Error deleting product:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

