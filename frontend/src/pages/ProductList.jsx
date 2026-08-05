import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function ProductList({ refresh }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    fetchProducts();
  }, [refresh]);


  const fetchProducts = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await API.get("/products");
      setProducts(response.data);

    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Failed to load products."
      );

    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }


    try {

      await API.delete(`/products/${id}`);

      fetchProducts();

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Failed to delete product."
      );

    }
  };


  if (loading) {
    return (
      <p style={{textAlign:"center"}}>
        Loading products...
      </p>
    );
  }


  return (
    <div
      style={{
        maxWidth:"1100px",
        margin:"40px auto"
      }}
    >

      <h2>
        Inventory Products
      </h2>


      {error && (
        <p
          style={{
            color:"red"
          }}
        >
          {error}
        </p>
      )}


      {products.length === 0 ? (

        <p>
          No products found.
        </p>

      ) : (

        <table
          style={{
            width:"100%",
            background:"white",
            borderCollapse:"collapse",
            borderRadius:"10px",
            overflow:"hidden"
          }}
        >

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

          {products.map((product) => (

            <tr key={product._id}>

              <td>
                {product.name}
              </td>

              <td>
                {product.sku}
              </td>

              <td>
                {product.category}
              </td>

              <td>
                {product.quantity}
              </td>

              <td>
                ${product.price}
              </td>


              <td>

                <Link to={`/edit/${product._id}`}>
                  <button
                    style={{
                      marginRight:"10px"
                    }}
                  >
                    Edit
                  </button>
                </Link>


                <button
                  onClick={() =>
                    handleDelete(product._id)
                  }
                  style={{
                    background:"#dc2626"
                  }}
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