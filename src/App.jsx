import "./styles/theme.css";
import "./styles/global.css";
import { ProductList } from "./components/ProductList";
import { Header } from "./components/Header";
import { Route, Routes } from "react-router";
import { Cart } from "./components/Cart";
import { CartProvider } from "./context/CartContext";
import { useState } from "react";

export default function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <CartProvider>
      {/* Passamos o isDark para o Header mudar o ícone do título */}
      <Header isDark={isDark} />
      <Routes>
        <Route 
          path="/" 
          element={<ProductList isDark={isDark} setIsDark={setIsDark} />} 
        />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </CartProvider>
  );
}