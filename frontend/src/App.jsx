import { useState } from "react";
import AddProduct from "./pages/AddProduct";
import ProductList from "./pages/ProductList";

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleProductAdded = () => {
    setRefresh(!refresh);
  };

  return (
    <div>
      <h1>Inventory Manager</h1>

      <AddProduct onProductAdded={handleProductAdded} />

      <hr />

      <ProductList refresh={refresh} />
    </div>
  );
}

export default App;