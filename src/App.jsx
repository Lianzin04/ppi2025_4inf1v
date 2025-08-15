import "./styles/theme.css";
import "./styles/global.css";
import { ProductList } from "./components2/ProductList";
import { Header } from "./components2/Header";
import { Route, Routes } from "react-router-dom";
import { Cart } from "./components2/Cart";
import { CartProvider } from "./service/CartContext";
import { Login } from "./components2/Login";
import { Register } from "./components2/Register";
import { ProductAdm } from "./components2/ProductAdm";

export default function App() {
  return (
    <>
      <CartProvider>
        <Header />
        <Routes>
          <Route path="/ProductList" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
           {}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/adm/products" element={<ProductAdm />} />

        </Routes>
      </CartProvider>
    </>
  );
}