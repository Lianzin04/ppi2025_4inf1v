import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";
import styles from "./Header.module.css";
import { Sun, Moon, Plus, Send, LogIn } from "lucide-react";

export function Header({ isDark, setIsDark }) {
  const { addMessage } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim().length < 3) return alert("A mensagem é muito curta!");
    
    // Pega o nome do usuário logado ou "Anônimo"
    const authorName = user?.user_metadata?.display_name || "Anônimo";
    
    // Envia a mensagem, o autor e o ID do usuário para o banco
    await addMessage(message, authorName, user?.id); 
    
    setMessage("");
    setIsFormOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo} onClick={() => navigate("/")} style={{cursor: 'pointer'}}>
        <Sun size={30} color="#818cf8" />
        <span>Cantinho de alguma coisa</span>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.messageWrapper}>
          <button className={styles.addBtn} onClick={() => setIsFormOpen(!isFormOpen)}>
            <Plus size={20} /> Deixar Mensagem
          </button>

          {isFormOpen && (
            <div className={styles.messageBox}>
              {!user ? (
                /* AVISO DE LOGIN NO MEIO DA CAIXA */
                <div className={styles.loginPrompt}>
                  <p>Ops. parece que você não está logado. Por favor, faça o login para deixar um recado.</p>
                  <button className={styles.sendBtn} onClick={() => { navigate("/login"); setIsFormOpen(false); }}>
                    <LogIn size={16} /> Ir para Login
                  </button>
                </div>
              ) : (
                /* FORMULÁRIO PARA USUÁRIO LOGADO */
                <>
                  <textarea
                    placeholder="Escreva sua mensagem de luz..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    autoFocus
                  />
                  <button className={styles.sendBtn} onClick={handleSubmit}>
                    <Send size={16} /> Enviar Luz
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        <div className={styles.themeToggle} onClick={() => setIsDark(!isDark)}>
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
          <span>{isDark ? "Modo Claro" : "Modo Noturno"}</span>
        </div>
      </div>
    </header>
  );
}