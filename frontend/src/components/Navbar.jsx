import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <h2>Inventory Manager</h2>

      <Link to="/">
        Home
      </Link>

      {" | "}

      <Link to="/products">
        Products
      </Link>

      {" | "}

      <Link to="/add">
        Add Product
      </Link>
    </nav>
  );
}

export default Navbar;