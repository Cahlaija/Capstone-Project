import AddProduct from "./pages/AddProduct";
import ProductList from "./pages/ProductList";

function App() {
  return (
    <div>
      <h1>Inventory Manager</h1>

      <AddProduct />

      <hr />

      <ProductList />
    </div>
  );
}

export default App;