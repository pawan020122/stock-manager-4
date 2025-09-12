// src/pages/EditProduct.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProducts, updateProduct, createProduct } from "../services/api";
import { toast } from "react-toastify";

const EditProduct = () => {
  const { id } = useParams(); // get product id from URL
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    quantity: "",
    price: "",
    type: "",
  });

  // Fetch product details on mount
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProducts();
        const product = res.data.find((p) => p._id === id);
        if (product) {
          setForm({
            name: product.name,
            quantity: product.quantity,
            price: product.price,
            type: product.type || "", // ✅ populate type if exists
          });
        }
      } catch (err) {
        console.error("Error loading product:", err.message);
      }
    };
    fetchProduct();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit updated product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(id, form);
      toast.success("Product updated successfully!");
      navigate("/"); // redirect back
    } catch (err) {
      toast.error("Error updating product:", err.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-blue-400"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-blue-400"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-blue-400"
            required
          />
          {/* ✅ Added Type Dropdown */}
        <div>
          <label className="block text-sm font-medium">Type</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-blue-400"
            required
          >
            <option value="">Select Type</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Food">Food</option>
            <option value="Stationery">Stationery</option>
          </select>
        </div>

        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
