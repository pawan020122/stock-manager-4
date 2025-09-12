// src/components/ProductSlider.jsx
import { useEffect, useState } from "react";
import Slider from "react-slick";
import {getProducts, deleteProduct, updateProduct} from "../services/api";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductSlider = () => {
  const [stocks, setStocks] = useState([]);

  // Fetch stocks
  const fetchStocks = async () => {
    try {
      const res = await getProducts();
      setStocks(res.data);
    } catch (err) {
      console.error("Error fetching products:", err.message);
    }
  };

  // Delete stock
const handleDelete = async (id) => {
  try {
    await deleteProduct(id);
    toast.error("Product deleted!");
    setStocks(stocks.filter((s) => s._id !== id)); // update UI
  } catch (err) {
    console.error("Error deleting stock:", err.response?.data || err.message);
  }
};


  useEffect(() => {
    fetchStocks();
  }, []);

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="mt-10 px-6">
      <h3 className="text-2xl font-bold mb-4 text-center">Your Stocks</h3>
      <Slider {...settings}>
        {stocks.map((stock) => (
          <div key={stock._id} className="p-3">
            <div className="bg-white text-gray-900 rounded-xl shadow-lg p-4 flex flex-col items-center">
              <h4 className="text-lg font-semibold">{stock.name}</h4>
              <p className="text-sm text-gray-600">Qty: {stock.quantity}</p>
              <p className="text-sm text-gray-600">Price: ₹{stock.price}</p>
              <p className="text-sm text-gray-600">Type: {stock.type}</p>

              <div className="flex gap-3 mt-3">
                {/* Edit button (will connect modal later) */}
                <button
                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
                onClick={() => window.location.href = `/edit/${stock._id}`}>
                    <FaEdit />
                    </button>


                {/* Delete button */}
                <button
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                  onClick={() => handleDelete(stock._id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductSlider;
