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

  // 1. READ: Buscar mensagens do Supabase
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
      console.error("Erro ao buscar mensagens:", err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  // 2. CREATE: Adicionar nova mensagem
  async function addMessage(content, author) {
    try {
      const { error } = await supabase
        .from("messages")
        .insert([{ content, author: author || "Anônimo" }]);
      
      if (error) throw error;
      await fetchMessages(); // Recarrega a lista para mostrar a nova mensagem
    } catch (err) {
      console.error("Erro ao adicionar:", err.message);
    }
  }

  // 3. DELETE: Remover mensagem por ID
  async function deleteMessage(id) {
    try {
      const { error } = await supabase
        .from("messages")
        .delete()
        .eq("id", id);

      if (error) throw error;
      // Atualiza o estado local para remover o card instantaneamente
      setProducts((prev) => prev.filter((msg) => msg.id !== id));
    } catch (err) {
      console.error("Erro ao deletar:", err.message);
    }
  }

  // 4. UPDATE: Editar conteúdo da mensagem
  async function updateMessage(id, newContent) {
    try {
      const { error } = await supabase
        .from("messages")
        .update({ content: newContent })
        .eq("id", id);
      
      if (error) throw error;
      await fetchMessages(); // Recarrega para refletir a edição
    } catch (err) {
      console.error("Erro ao atualizar:", err.message);
    }
  }

  const context = {
    products, // Mantemos o nome 'products' para não quebrar seu .map no ProductList
    loading,
    error,
    addMessage,
    deleteMessage,
    updateMessage,
  };

  return (
    <CartContext.Provider value={context}>
      {children}
    </CartContext.Provider>
  );
}