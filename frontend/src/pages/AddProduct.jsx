import { useState } from "react";
import API from "../services/api";

function AddProduct({ onProductAdded }) {
  const [product, setProduct] = useState({
    name: "",
    sku: "",
    category: "",
    quantity: "",
    price: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");


  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      await API.post("/products", {
        ...product,
        quantity: Number(product.quantity),
        price: Number(product.price),
      });

      setMessage("Product added successfully!");

      onProductAdded();

      setProduct({
        name: "",
        sku: "",
        category: "",
        quantity: "",
        price: "",
      });

    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Failed to add product."
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "40px auto",
        background: "white",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,.1)"
      }}
    >

      <h2>Add Product</h2>

      {message && (
        <p style={{color:"green"}}>
          {message}
        </p>
      )}

      {error && (
        <p style={{color:"red"}}>
          {error}
        </p>
      )}


      <form onSubmit={handleSubmit}>

        {[
          ["name","Product Name"],
          ["sku","SKU"],
          ["category","Category"],
          ["quantity","Quantity"],
          ["price","Price"]
        ].map(([name, placeholder]) => (

          <input
            key={name}
            type={
              name === "quantity" || name === "price"
              ? "number"
              : "text"
            }
            name={name}
            placeholder={placeholder}
            value={product[name]}
            onChange={handleChange}
            required
            style={{
              width:"100%",
              padding:"10px",
              marginBottom:"15px",
              borderRadius:"6px",
              border:"1px solid #ccc",
              boxSizing:"border-box"
            }}
          />

        ))}


        <button
          type="submit"
          disabled={loading}
          style={{
            width:"100%",
            padding:"12px",
            borderRadius:"6px",
            border:"none",
            background:"#2563eb",
            color:"white",
            cursor:"pointer"
          }}
        >
          {loading ? "Adding..." : "Add Product"}
        </button>

      </form>

    </div>
  );
}

export default AddProduct;