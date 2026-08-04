import { useEffect, useState } from "react";
import API from "../services/api";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await API.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error loading dashboard:", error);
    }
  };

  const totalProducts = products.length;

  const totalQuantity = products.reduce(
    (total, product) => total + product.quantity,
    0
  );

  const totalValue = products.reduce(
    (total, product) =>
      total + product.price * product.quantity,
    0
  );

  return (
    <div>
      <h1>Inventory Dashboard</h1>

      <div>
        <h3>Total Products</h3>
        <p>{totalProducts}</p>
      </div>

      <div>
        <h3>Total Items</h3>
        <p>{totalQuantity}</p>
      </div>

      <div>
        <h3>Inventory Value</h3>
        <p>${totalValue.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default Home;