import "./styles/theme.css";
import "./styles/global.css";
import { ProductList } from "./components2/ProductList";
import { Header } from "./components2/Header";
import { Route, Routes } from "react-router";
import { Cart } from "./components2/Cart";
import { CartProvider } from "./service/CartContext";

export default function App() {

  return (
    <>
      <CartProvider>
        <Header />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </CartProvider>
    </>
  );
}