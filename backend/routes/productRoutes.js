import express from "express";
import { createProduct, getProducts, updateProduct, deleteProduct } from "../controllers/productControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// CRUD for products
router.post("/create", protect, createProduct);
router.get("/", protect, getProducts);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
