import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ProductList({ refresh }) {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  const fetchProducts = async () => {
    try {

      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/products"
      );

      if (!response.ok) {
        throw new Error("Failed to load products");
      }

      const data = await response.json();

      setProducts(data);

    } catch (err) {

      setError(err.message);

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {
    fetchProducts();
  }, [refresh]);



  const deleteProduct = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this product?"
    );

    if (!confirmDelete) return;


    await fetch(
      `http://localhost:5000/products/${id}`,
      {
        method: "DELETE",
      }
    );


    fetchProducts();

  };



  const filteredProducts = products.filter((product) =>
    product.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );



  if (loading) {

    return (

      <div className="container mt-5 text-center">

        <div className="spinner-border text-primary"></div>

        <p className="mt-3">
          Loading inventory...
        </p>

      </div>

    );

  }



  return (

    <div className="container mt-4">


      <div className="card shadow-sm">

        <div className="card-body">


          <div className="d-flex justify-content-between align-items-center mb-4">


            <div>

              <h2 className="fw-bold">
                Product Inventory
              </h2>

              <p className="text-muted">
                Total Products: {products.length}
              </p>

            </div>



            <Link
              to="/add"
              className="btn btn-success"
            >
              ➕ Add Product
            </Link>


          </div>



          <input

            className="form-control mb-4"

            placeholder="🔍 Search products..."

            value={search}

            onChange={(e)=>setSearch(e.target.value)}

          />



          {error && (

            <div className="alert alert-danger">

              {error}

            </div>

          )}




          {filteredProducts.length === 0 ? (

            <div className="alert alert-info">

              No products found.

            </div>

          ) : (


            <div className="table-responsive">


              <table className="table table-hover align-middle">


                <thead className="table-dark">


                  <tr>

                    <th>
                      Product
                    </th>

                    <th>
                      Category
                    </th>

                    <th>
                      Price
                    </th>

                    <th>
                      Quantity
                    </th>

                    <th>
                      Status
                    </th>

                    <th>
                      Actions
                    </th>

                  </tr>


                </thead>



                <tbody>


                {filteredProducts.map((product)=>(


                  <tr key={product._id}>


                    <td className="fw-semibold">

                      {product.name}

                    </td>


                    <td>

                      {product.category}

                    </td>


                    <td>

                      ${product.price}

                    </td>



                    <td>

                      {product.quantity}

                    </td>



                    <td>


                    {product.quantity <= 5 ? (


                      <span className="badge bg-danger">

                        Low Stock

                      </span>


                    ) : (


                      <span className="badge bg-success">

                        Available

                      </span>


                    )}


                    </td>



                    <td>


                      <Link

                        to={`/edit/${product._id}`}

                        className="btn btn-primary btn-sm me-2"

                      >

                        Edit

                      </Link>



                      <button

                        className="btn btn-danger btn-sm"

                        onClick={()=>deleteProduct(product._id)}

                      >

                        Delete

                      </button>


                    </td>


                  </tr>


                ))}


                </tbody>


              </table>


            </div>


          )}


        </div>

      </div>


    </div>

  );

}


export default ProductList;