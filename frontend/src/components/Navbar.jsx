import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={{ marginBottom: "20px" }}>
      <h2>Inventory Manager</h2>

      <Link to="/">Home</Link>

      {" | "}

      <Link to="/products">Products</Link>

      {" | "}

      <Link to="/add">Add Product</Link>

      {" | "}

      {!user ? (
        <>
          <Link to="/login">Login</Link>

          {" | "}

          <Link to="/register">Register</Link>
        </>
      ) : (
        <>
          <span style={{ marginLeft: "10px", marginRight: "10px" }}>
            Welcome, {user.username}
          </span>

          <button onClick={handleLogout}>
            Logout
          </button>
        </>
      )}
    </nav>
  );
}

export default Navbar;