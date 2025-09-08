import mongoose from "mongoose";
import Product from "./Product.js";

const saleSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true },
    total: { type: Number, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // 👈 track user
  },
  { timestamps: true }
);

// Middleware to calculate total before saving
saleSchema.pre("save", async function (next) {
  try {
    const product = await Product.findById(this.product);
    if (product) {
      this.total = product.price * this.quantity;
    }
    next();
  } catch (err) {
    next(err);
  }
});

export default mongoose.model("Sale", saleSchema);
