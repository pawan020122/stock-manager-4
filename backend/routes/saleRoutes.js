import express from "express";
import { createSale, getSales, getTotalSales } from "../controllers/saleControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Record a sale and get sales list
router.post("/create", protect, createSale);
router.get("/", protect, getSales);
router.get("/total", protect, getTotalSales);

export default router;
