import { useState, useEffect, createContext } from "react";
import { supabase } from "../utils/supabase";

export const CartContext = createContext({
  products: [],
  loading: false,
  error: null,
  addMessage: () => {},
  deleteMessage: () => {},
  updateMessage: () => {},
});

export function CartProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchMessages() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  async function addMessage(content, author, userId) {
    try {
      const { error } = await supabase
        .from("messages")
        .insert([{ 
          content, 
          author: author || "Anônimo",
          user_id: userId 
        }]);
      
      if (error) throw error;
      await fetchMessages();
    } catch (err) {
      console.error("Erro ao adicionar:", err.message);
    }
  }

  async function deleteMessage(id) {
    try {
      const { error } = await supabase.from("messages").delete().eq("id", id);
      if (error) throw error;
      setProducts((prev) => prev.filter((msg) => msg.id !== id));
    } catch (err) {
      console.error("Erro ao deletar:", err.message);
    }
  }

  async function updateMessage(id, newContent) {
    try {
      const { error } = await supabase.from("messages").update({ content: newContent }).eq("id", id);
      if (error) throw error;
      await fetchMessages();
    } catch (err) {
      console.error("Erro ao atualizar:", err.message);
    }
  }

  return (
    <CartContext.Provider value={{ products, loading, error, addMessage, deleteMessage, updateMessage }}>
      {children}
    </CartContext.Provider>
  );
}