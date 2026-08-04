import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function ProductList({ refresh }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

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
    try {
      await API.delete(`/products/${id}`);

      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.sku.toLowerCase().includes(search.toLowerCase()) ||
    product.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Inventory Products</h2>

      <input
        type="text"
        placeholder="Search by name, SKU, or category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Name</th>
              <th>SKU</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.sku}</td>
                <td>{product.category}</td>
                <td>{product.quantity}</td>
                <td>${product.price}</td>

                <td>
                  <Link to={`/edit/${product._id}`}>
                    <button>
                      Edit
                    </button>
                  </Link>

                  <button
                    onClick={() => handleDelete(product._id)}
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