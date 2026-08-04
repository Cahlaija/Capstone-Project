import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import ProductList from "./pages/ProductList";
import EditProduct from "./pages/EditProduct";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/products"
          element={<ProductList />}
        />

        <Route
          path="/add"
          element={<AddProduct onProductAdded={() => {}} />}
        />

        <Route
          path="/edit/:id"
          element={<EditProduct />}
        />
      </Routes>
    </>
  );
}

export default App;