import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";
import styles from "./Header.module.css";
import { Sun, Moon, Plus, Send, LogIn, User, Check, X } from "lucide-react";

export function Header({ isDark, setIsDark }) {
  const { addMessage } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
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
    await logout();
    setShowLogoutConfirm(false);
    navigate("/");
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo} onClick={() => navigate("/")} style={{cursor: 'pointer'}}>
          <Sun size={32} color="#818cf8" />
          <span>Cantinho de alguma coisa</span>
        </div>

        <div className={styles.rightSection}>
          <button className={styles.addBtn} onClick={() => setIsFormOpen(true)}>
            <Plus size={20} /> Deixar Mensagem
          </button>

          <div className={styles.themeToggle} onClick={() => setIsDark(!isDark)}>
            {isDark ? <Sun size={22} /> : <Moon size={22} />}
            <span>{isDark ? "Modo Claro" : "Modo Noturno"}</span>
          </div>
        </div>
      </header>

      {/* MODAL DE MENSAGEM NO MEIO DO SITE */}
      {isFormOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsFormOpen(false)}>
          <div className={styles.centeredMessageBox} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeModal} onClick={() => setIsFormOpen(false)}>
              <X size={24} />
            </button>
            
            {!user ? (
              <div className={styles.loginPrompt}>
                <h2>Quase lá...</h2>
                {/* FRASE AUMENTADA AQUI */}
                <p className={styles.highlightText}>
                  Você precisa estar logado para espalhar sua luz no mundo
                </p>
                <button className={styles.sendBtn} onClick={() => { navigate("/login"); setIsFormOpen(false); }}>
                  <LogIn size={18} /> Ir para Login
                </button>
              </div>
            ) : (
              <div className={styles.formContainer}>
                <h2>Deixe sua mensagem</h2>
                <textarea
                  placeholder="Escreva sua mensagem de luz..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  autoFocus
                />
                <button className={styles.sendBtn} onClick={handleSubmit}>
                  <Send size={18} /> Enviar Luz
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* BOTÃO FLUTUANTE DE LOGIN/USUÁRIO */}
      <div className={styles.floatingContainer}>
        {!user ? (
          <button className={styles.loginFloatBtn} onClick={() => navigate("/login")}>
            <LogIn size={22} />
            <span>Entrar</span>
          </button>
        ) : (
          <div className={styles.logoutConfirmWrapper}>
            {showLogoutConfirm ? (
              <div className={styles.confirmBox}>
                <span>Sair?</span>
                <div className={styles.confirmActions}>
                  <button className={styles.confirmBtn} onClick={handleLogout}>
                    <Check size={20} />
                  </button>
                  <button className={styles.cancelBtn} onClick={() => setShowLogoutConfirm(false)}>
                    <X size={20} />
                  </button>
                </div>
              </div>
            ) : (
              <div className={styles.floatingUserBadge} onClick={() => setShowLogoutConfirm(true)}>
                <User size={22} />
                <span>{user?.user_metadata?.display_name?.split(' ')[0]}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}