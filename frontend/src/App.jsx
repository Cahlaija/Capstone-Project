import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductList from "./pages/ProductList";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/ProtectedRoute";


function App() {

  const [refresh, setRefresh] = useState(false);


  const handleProductAdded = () => {
    setRefresh((prev) => !prev);
  };


  return (

    <>

      <Navbar />


      <main className="container py-4">

        <Routes>


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


          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <ProductList refresh={refresh} />
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


          <Route
            path="*"
            element={<NotFound />}
          />


        </Routes>

      </main>


    </>

  );
}


export default App;