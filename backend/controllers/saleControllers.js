import Sale from "../models/sale.js";
import Product from "../models/Product.js";

// Create sale (and decrease product stock)
export const createSale = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const qty = Number(quantity);

    if (!productId || isNaN(qty) || qty <= 0) {
      return res.status(400).json({ message: "Invalid productId or quantity" });
    }

    const product = await Product.findById(productId);

    if (!product || product.quantity < qty) {
      return res.status(400).json({ message: "Not enough stock" });
    }

    // decrease stock
    product.quantity -= qty;
    await product.save();

    // calculate total price
    const total = product.price * qty;

    // create sale and attach user
    const sale = await Sale.create({
      product: productId,
      quantity: qty,
      total,
      createdBy: req.user._id, // 👈 link sale to user
    });

    res.status(201).json(sale);
  } catch (error) {
    console.error("POST /sales/create error:", error.message);
    res.status(400).json({ message: error.message });
  }
};

// Get all sales
export const getSales = async (req, res) => {
  try {
    const sales = await Sale.find({ createdBy: req.user.id }).populate("product");
    res.json(sales);
  } catch (err) {
    res.status(500).json({ message: "Error fetching sales" });
  }
};

// 👇 new endpoint to get total sales amount
export const getTotalSales = async (req, res) => {
  try {
    const result = await Sale.aggregate([
      { $match: { createdBy: req.user._id } },
      { $group: { _id: null, totalAmount: { $sum: "$total" } } },
    ]);

    const totalAmount = result[0]?.totalAmount || 0;
    res.json({ totalAmount });
  } catch (err) {
    res.status(500).json({ message: "Error calculating total amount" });
  }
};
