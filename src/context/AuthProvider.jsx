import { useState, useEffect } from "react";
import { Route, Routes } from "react-router";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

// Importação de Estilos
import "./styles/theme.css";
import "./styles/global.css";

// Importação de Componentes
import { Header } from "./components/Header";
import { ProductList } from "./components/ProductList";
import { Cart } from "./components/Cart";
import { Login } from "./components/Login";

export default function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <AuthProvider>
      <CartProvider>
        <div className="app-container">
          <Header isDark={isDark} setIsDark={setIsDark} />
          <Routes>
            <Route path="/" element={<ProductList isDark={isDark} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </CartProvider>
    </AuthProvider>
  );
}