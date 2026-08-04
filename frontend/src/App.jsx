import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import ProductList from "./pages/ProductList";
import EditProduct from "./pages/EditProduct";
import Login from "./pages/Login";
import Register from "./pages/Register";


function App() {
  const [refresh, setRefresh] = useState(false);


  const handleProductAdded = () => {
    setRefresh(!refresh);
  };


  return (
    <div>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />


        <Route
          path="/products"
          element={
            <ProductList
              refresh={refresh}
            />
          }
        />


        <Route
          path="/add"
          element={
            <AddProduct
              onProductAdded={handleProductAdded}
            />
          }
        />


        <Route
          path="/edit/:id"
          element={<EditProduct />}
        />


        <Route
          path="/login"
          element={<Login />}
        />


        <Route
          path="/register"
          element={<Register />}
        />


      </Routes>

    </div>
  );
}

export default App;