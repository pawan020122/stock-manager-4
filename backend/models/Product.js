import mongoose from 'mongoose';


const productSchema = new mongoose.Schema(
{
name: { type: String, required: true },
sku: { type: String },
description: { type: String },
price: { type: Number, required: true, default: 0 },
quantity: { type: Number, required: true, default: 0 },
type: { type: String, required: true }, // 👈 new field
createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
},
{ timestamps: true }
);


export default mongoose.model("Product", productSchema);