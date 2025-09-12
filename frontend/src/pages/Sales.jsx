import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

function Sales() {
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ productId: "", quantity: "" });
  const [totalAmount, setTotalAmount] = useState(0);

  const fetchSales = async () => {
    try {
      const res = await api.get("/sales/", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setSales(res.data);

      // 👇 Calculate total from sales list
      const total = res.data.reduce((sum, s) => sum + (s.total || 0), 0);
      setTotalAmount(total);


    } catch {
      toast.error("Failed to fetch sales");
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setProducts(res.data);
      
    } catch {
      toast.error("Failed to fetch products");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post(
        "/sales/create",
        {
          productId: form.productId,
          quantity: Number(form.quantity),
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setForm({ productId: "", quantity: "" });
      fetchSales();
            toast.success("Sales data loaded ✅");
    } catch (err) {
      console.error("Error response:", err.response?.data);
      toast.error(err.response?.data?.message || "Error recording sale");
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchSales();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Sales</h2>

      {/* Record sale form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow p-4 rounded mb-6 w-80"
      >
        <select
          className="border p-2 w-full mb-3"
          value={form.productId}
          onChange={(e) => setForm({ ...form, productId: e.target.value })}
          required
        >
          <option value="">Select product</option>
          {products.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Quantity"
          className="border p-2 w-full mb-3"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded"
        >
          Record Sale
        </button>
      </form>

      {/* Sales list */}
      <table className="bg-white shadow w-full border mb-6">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Product</th>
            <th className="p-2 border">Quantity</th>
            <th className="p-2 border">Total</th>
            <th className="p-2 border">Date</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((s) => (
            <tr key={s._id}>
              <td className="p-2 border">
                {s.product?.name}
              </td>
              <td className="p-2 border">{s.quantity}</td>
              <td className="p-2 border">₹{s.total}</td>
              <td className="p-2 border">
                {new Date(s.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Total sales amount */}
      <div className="bg-white shadow w-64 p-4 rounded">
        <h3 className="text-lg font-bold">Total Sales Amount</h3>
        <p className="text-xl font-semibold text-green-600">₹{totalAmount}</p>
      </div>
    </div>
  );
}

export default Sales;
