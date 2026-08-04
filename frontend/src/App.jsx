import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AddProduct from "./pages/AddProduct";
import ProductList from "./pages/ProductList";
import EditProduct from "./pages/EditProduct";

function Home({ refresh, handleProductAdded }) {
  return (
    <div>
      <h1>Inventory Manager</h1>

      <AddProduct onProductAdded={handleProductAdded} />

      <hr />

      <ProductList refresh={refresh} />
    </div>
  );
}

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleProductAdded = () => {
    setRefresh(!refresh);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              refresh={refresh}
              handleProductAdded={handleProductAdded}
            />
          }
        />

        <Route
          path="/edit/:id"
          element={<EditProduct />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;