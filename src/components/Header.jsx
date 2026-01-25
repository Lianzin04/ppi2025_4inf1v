import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";
import styles from "./Header.module.css";
import { Sun, Moon, Plus, Send, LogIn, User, Check, X } from "lucide-react";

export function Header({ isDark, setIsDark }) {
  const { addMessage } = useContext(CartContext);
  const { user, signOut } = useContext(AuthContext);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false); // Novo estado
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim().length < 3) return alert("A mensagem é muito curta!");
    const authorName = user?.user_metadata?.display_name || "Anônimo";
    await addMessage(message, authorName, user?.id); 
    setMessage("");
    setIsFormOpen(false);
  };

  const handleLogout = async () => {
    await signOut();
    setShowLogoutConfirm(false);
  };

  return (
    <>
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
                  <div className={styles.loginPrompt}>
                    <p>Ops. parece que você não está logado. Por favor, faça o login para deixar um recado.</p>
                    <button className={styles.sendBtn} onClick={() => { navigate("/login"); setIsFormOpen(false); }}>
                      <LogIn size={16} /> Ir para Login
                    </button>
                  </div>
                ) : (
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

      {/* BOTÃO FLUTUANTE DINÂMICO */}
      <div className={styles.floatingContainer}>
        {!user ? (
          <button className={styles.loginFloatBtn} onClick={() => navigate("/login")}>
            <LogIn size={20} />
            <span>Entrar</span>
          </button>
        ) : (
          <div className={styles.logoutConfirmWrapper}>
            {showLogoutConfirm ? (
              <div className={styles.confirmBox}>
                <span>Deseja sair?</span>
                <div className={styles.confirmActions}>
                  <button className={styles.confirmBtn} onClick={handleLogout}>
                    <Check size={16} />
                  </button>
                  <button className={styles.cancelBtn} onClick={() => setShowLogoutConfirm(false)}>
                    <X size={16} />
                  </button>
                </div>
              </div>
            ) : (
              <div className={styles.floatingUserBadge} onClick={() => setShowLogoutConfirm(true)}>
                <User size={20} />
                <span>{user?.user_metadata?.display_name?.split(' ')[0]}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}