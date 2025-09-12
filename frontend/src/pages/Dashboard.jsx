import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import ProductSlider from "../components/ProductSlider"; // 👈 import the slider

function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  let userName = "";
  if (token) {
    try {
      const decoded = jwtDecode(token); // decode JWT
      userName = decoded.name || decoded.email || "User"; // fallback
    } catch (err) {
      console.error("Invalid token:", err.message);
    }
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-blue-700 to-purple-800 text-white flex flex-col">
      {/* ✅ Welcome Section */}
      <section className="flex items-center justify-center px-6 py-12">
        <div className="max-w-4xl text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Dashboard 📊
          </h2>

          {token ? (
            <p className="text-lg md:text-xl text-gray-200 mb-8">
              Welcome back, <span className="font-semibold">{userName}</span> 🎉  
              Manage your <span className="font-semibold">stocks</span> and{" "}
              <span className="font-semibold">sales</span> easily.
            </p>
          ) : (
            <p className="text-lg md:text-xl text-gray-200 mb-8">
              Please login to manage products and sales.
            </p>
          )}

          {token && (
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => navigate("/products")}
                className="bg-white text-blue-800 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
              >
                View Stocks
              </button>
              <button
                onClick={() => navigate("/sales")}
                className="bg-green-400 text-gray-900 font-semibold px-6 py-3 rounded-lg hover:bg-green-300 transition"
              >
                Manage Sales
              </button>
              <button
                onClick={() => navigate("/contacts")}
                className="bg-yellow-400 text-gray-900 font-semibold px-6 py-3 rounded-lg hover:bg-yellow-300 transition"
              >
                Contact Us
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ✅ Product Slider Section */}
      {token && (
        <section className="bg-gray-100 text-gray-900 py-12">
          <div className="max-w-6xl mx-auto px-6">
            <ProductSlider />
          </div>
        </section>
      )}
    </div>
  );
}

export default Dashboard;
