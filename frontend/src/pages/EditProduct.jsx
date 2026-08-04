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

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await API.get(`/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error("Error loading product:", error);
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

    try {
      await API.put(`/products/${id}`, {
        ...product,
        quantity: Number(product.quantity),
        price: Number(product.price),
      });

      navigate("/");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div>
      <h2>Edit Product</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Product Name"
          required
        />

        <input
          name="sku"
          value={product.sku}
          onChange={handleChange}
          placeholder="SKU"
          required
        />

        <input
          name="category"
          value={product.category}
          onChange={handleChange}
          placeholder="Category"
          required
        />

        <input
          type="number"
          name="quantity"
          value={product.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          required
        />

        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />

        <button type="submit">
          Update Product
        </button>
      </form>
    </div>
  );
}

export default EditProduct;