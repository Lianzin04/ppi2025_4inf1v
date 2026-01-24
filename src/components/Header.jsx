import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import styles from "./Header.module.css";
import { Sun, Moon, Plus, Send } from "lucide-react";

export function Header({ isDark, setIsDark }) {
  const { addMessage } = useContext(CartContext);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim().length < 3) return alert("A mensagem é muito curta!");
    
    await addMessage(message); // Chama a função do Supabase
    setMessage("");
    setIsFormOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Sun size={30} color="#818cf8" />
        <span>Cantinho de alguma coisa</span>
      </div>

      <div className={styles.rightSection}>
        {/* Container do Botão e Form */}
        <div className={styles.messageWrapper}>
          <button 
            className={styles.addBtn} 
            onClick={() => setIsFormOpen(!isFormOpen)}
          >
            <Plus size={20} />
            Deixar Mensagem
          </button>

          {isFormOpen && (
            <div className={styles.messageBox}>
              <textarea
                placeholder="Escreva sua mensagem de luz..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                autoFocus
              />
              <button className={styles.sendBtn} onClick={handleSubmit}>
                <Send size={16} />
                Enviar Luz
              </button>
            </div>
          )}
        </div>

        <div className={styles.themeToggle} onClick={() => setIsDark(!isDark)}>
          {isDark ? <Sun size={30} /> : <Moon size={20} />}
          <span>{isDark ? "Modo Claro" : "Modo Noturno"}</span>
        </div>
      </div>
    </header>
  );
}