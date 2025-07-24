import "./styles/theme.css";
import "./styles/global.css";
import { ProductList } from "./components2/ProductList";
import { Header } from "./components2/Header";
import { useState } from "react";
import { Route, Routes } from "react-router";
import { Cart } from "./components2/Cart";

export default function App() {
  const [cart, setCart] = useState([]);

  function addToCart(product) {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  }

  function updateQuantity(productId, change) {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(item.quantity + change, 1) }
          : item
      )
    );
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <>
      <Header cart={cart} />
      <Routes>
        <Route path="/" element={<ProductList addToCart={addToCart} />} />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              updateQuantity={updateQuantity}
              clearCart={clearCart}
            />
          }
        />
      </Routes>
    </>
  );
}