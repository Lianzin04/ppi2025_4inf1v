import "./styles/theme.css"
import "./styles/global.css";
import { ProductList } from "./components2/ProductList";
import { Header } from "./components2/Header";
import { useState } from "react";
import { Route, Routes } from "react-router";
import { Cart } from "./components2/Cart";

export default function App() {
  
  const [cart, setCart] = useState([]);

  function addToCart(product) {
    setCart((prevCart) => [...prevCart, product]);
  }

  return (
    //React Fragment
    <>
      <Header cart={cart} />
      <Routes>
        <Route path="/" element={<ProductList addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} />} />
      </Routes>
    </>
  );
}