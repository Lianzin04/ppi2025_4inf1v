import { useState, useEffect } from "react";
import { Route, Routes } from "react-router";
import { CartProvider } from "./context/CartContext";

// Importação de Estilos
import "./styles/theme.css";
import "./styles/global.css";

// Importação de Componentes
import { Header } from "./components/Header";
import { ProductList } from "./components/ProductList";
import { Cart } from "./components/Cart";

export default function App() {
  // Estado global do tema para evitar conflitos e tela branca
  const [isDark, setIsDark] = useState(false);

  // Efeito para aplicar o atributo de tema no HTML sempre que isDark mudar
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <CartProvider>
      <div className="app-container">
        {/* Passamos o estado e a função para o Header */}
        <Header isDark={isDark} setIsDark={setIsDark} />
        
        <Routes>
          <Route
            path="/"
            element={
              <ProductList isDark={isDark} setIsDark={setIsDark} />
            }
          />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </CartProvider>
  );
}