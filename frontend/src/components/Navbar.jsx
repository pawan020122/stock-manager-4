import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="font-bold">Stock Manager</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        {isLoggedIn && (
          <>
            <Link to="/products" className="hover:underline">Products</Link>
            <Link to="/sales" className="hover:underline">Sales</Link>
          </>
        )}
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        ) : (
          <button
  onClick={() => {
    if (window.confirm("Are you sure you want to logout?")) {
      handleLogout();
      alert("You have been logged out successfully!");
    }
  }}
  className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
>
  Logout
</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
