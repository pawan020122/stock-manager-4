import { useEffect, useState } from "react";
import api from "../services/api";

function Products() {
  const [searchType, setSearchType] = useState("");
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", quantity: "", price: "", type: "" });

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products/", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setProducts(res.data);
    } catch (err) {
      alert("Failed to fetch products");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/products/create", form, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setForm({ name: "", quantity: "", price: "" });
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || "Error adding product");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Products</h2>

      {/* Add product form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow p-4 rounded mb-6 w-80"
      >
        <input
          type="text"
          placeholder="Name"
          className="border p-2 w-full mb-3"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          className="border p-2 w-full mb-3"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          className="border p-2 w-full mb-3"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        {/* 👇 Add product type dropdown here */}
  <select
    value={form.type}
    onChange={(e) => setForm({ ...form, type: e.target.value })}
    className="border p-2 w-full mb-3"
    required
  >
    <option value="">Select Type</option>
    <option value="Electronics">Electronics</option>
    <option value="Clothing">Clothing</option>
    <option value="Food">Food</option>
    <option value="Stationery">Stationery</option>
  </select>


        <button
          type="submit"
          className="bg-green-600 text-white w-full py-2 rounded"
        >
          Add Product
        </button>
      </form>



      {/* 👇 Dropdown for filtering */}
      <select
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
        className="border p-2 mb-4"
      >
        <option value="">All Types</option>
        <option value="Electronics">Electronics</option>
        <option value="Clothing">Clothing</option>
        <option value="Food">Food</option>
        <option value="Stationery">Stationery</option>
      </select>

      {/* Product list */}
      <table className="bg-white shadow w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Quantity</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Type</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td className="p-2 border">{p.name}</td>
              <td className="p-2 border">{p.quantity}</td>
              <td className="p-2 border">₹{p.price}</td>
              <td className="p-2 border">{p.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;
