import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

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

        {/* Public Routes */}

        <Route
          path="/"
          element={<Home />}
        />


        <Route
          path="/login"
          element={<Login />}
        />


        <Route
          path="/register"
          element={<Register />}
        />


        {/* Protected Routes */}

        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductList
                refresh={refresh}
              />
            </ProtectedRoute>
          }
        />


        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <AddProduct
                onProductAdded={handleProductAdded}
              />
            </ProtectedRoute>
          }
        />


        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditProduct />
            </ProtectedRoute>
          }
        />


      </Routes>

    </div>
  );
}

export default App;