import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    sku: "",
    category: "",
    quantity: "",
    price: "",
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");


  useEffect(() => {
    fetchProduct();
  }, []);


  const fetchProduct = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await API.get(`/products/${id}`);
      setProduct(response.data);

    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Failed to load product."
      );

    } finally {
      setLoading(false);
    }
  };


  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setMessage("");
    setError("");

    try {

      await API.put(`/products/${id}`, {
        ...product,
        quantity: Number(product.quantity),
        price: Number(product.price),
      });


      setMessage("Product updated successfully!");

      setTimeout(() => {
        navigate("/products");
      }, 1000);


    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Failed to update product."
      );

    } finally {
      setSaving(false);
    }
  };


  if (loading) {
    return (
      <p style={{textAlign:"center"}}>
        Loading product...
      </p>
    );
  }


  return (
    <div
      style={{
        maxWidth:"500px",
        margin:"40px auto",
        background:"white",
        padding:"30px",
        borderRadius:"10px",
        boxShadow:"0 4px 10px rgba(0,0,0,.1)"
      }}
    >

      <h2>
        Edit Product
      </h2>


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
          disabled={saving}
          style={{
            width:"100%",
            padding:"12px",
            background:"#2563eb",
            color:"white",
            border:"none",
            borderRadius:"6px",
            cursor:"pointer"
          }}
        >
          {saving ? "Saving..." : "Update Product"}

        </button>


      </form>

    </div>
  );
}

export default EditProduct;