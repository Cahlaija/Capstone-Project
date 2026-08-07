import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container mt-4">

      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">
          Inventory Dashboard
        </h1>

        <p className="lead text-muted">
          Manage your products, track inventory, and keep your business organized.
        </p>
      </div>


      {/* Quick Actions */}
      <div className="d-flex justify-content-center gap-3 mb-5">

        <Link
          to="/products"
          className="btn btn-primary btn-lg"
        >
          📦 View Products
        </Link>


        <Link
          to="/add"
          className="btn btn-success btn-lg"
        >
          ➕ Add Product
        </Link>

      </div>



      {/* Dashboard Cards */}
      <div className="row g-4">


        <div className="col-md-3">
          <div className="card shadow-sm h-100">

            <div className="card-body text-center">

              <h5 className="card-title">
                📦 Products
              </h5>

              <h2 className="fw-bold">
                --
              </h2>

              <p className="text-muted">
                Total inventory items
              </p>

            </div>

          </div>
        </div>




        <div className="col-md-3">
          <div className="card shadow-sm h-100">

            <div className="card-body text-center">

              <h5 className="card-title">
                🏷 Categories
              </h5>

              <h2 className="fw-bold">
                --
              </h2>

              <p className="text-muted">
                Product categories
              </p>

            </div>

          </div>
        </div>




        <div className="col-md-3">
          <div className="card shadow-sm h-100">

            <div className="card-body text-center">

              <h5 className="card-title">
                ⚠ Low Stock
              </h5>

              <h2 className="fw-bold text-danger">
                --
              </h2>

              <p className="text-muted">
                Items needing attention
              </p>

            </div>

          </div>
        </div>




        <div className="col-md-3">
          <div className="card shadow-sm h-100">

            <div className="card-body text-center">

              <h5 className="card-title">
                💰 Value
              </h5>

              <h2 className="fw-bold">
                --
              </h2>

              <p className="text-muted">
                Inventory value
              </p>

            </div>

          </div>

        </div>


      </div>


      {/* Footer Message */}
      <div className="text-center mt-5">

        <p className="text-muted">
          Use the navigation above to manage your inventory.
        </p>

      </div>


    </div>
  );
}

export default Home;