import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function ProductList({ refresh }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    fetchProducts();
  }, [refresh]);

  const fetchProducts = async () => {
    try {
      const response = await API.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Categories for dropdown
  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.sku.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  // Sort products
  const sortedProducts = [...filteredProducts];

  switch (sortBy) {
    case "name":
      sortedProducts.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      break;

    case "priceLow":
      sortedProducts.sort((a, b) => a.price - b.price);
      break;

    case "priceHigh":
      sortedProducts.sort((a, b) => b.price - a.price);
      break;

    case "quantityLow":
      sortedProducts.sort((a, b) => a.quantity - b.quantity);
      break;

    case "quantityHigh":
      sortedProducts.sort((a, b) => b.quantity - a.quantity);
      break;

    default:
      break;
  }

  return (
    <div>
      <h2>Inventory Products</h2>

      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "20px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="Search by Name or SKU..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "8px",
            width: "250px",
          }}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ padding: "8px" }}
        >
          {categories.map((cat) => (
            <option
              key={cat}
              value={cat}
            >
              {cat}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{ padding: "8px" }}
        >
          <option value="">Sort By</option>
          <option value="name">Name (A–Z)</option>
          <option value="priceLow">Price (Low → High)</option>
          <option value="priceHigh">Price (High → Low)</option>
          <option value="quantityLow">Quantity (Low → High)</option>
          <option value="quantityHigh">Quantity (High → Low)</option>
        </select>
      </div>

      {sortedProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Name</th>
              <th>SKU</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {sortedProducts.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.sku}</td>
                <td>{product.category}</td>
                <td>{product.quantity}</td>
                <td>${Number(product.price).toFixed(2)}</td>

                <td>
                  <Link to={`/edit/${product._id}`}>
                    <button>Edit</button>
                  </Link>

                  <button
                    onClick={() => handleDelete(product._id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ProductList;