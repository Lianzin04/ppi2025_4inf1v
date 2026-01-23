import styles from "./Header.module.css";
import { Sun, Moon, Plus } from "lucide-react";

export function Header({ isDark }) {
  return (
    <header className={styles.header}>
      <div className={styles.logoArea}>
        {/* REQUISITO 3: Ícone muda no título conforme o tema */}
        {isDark ? (
          <Moon size={24} className={styles.moonIcon} color="#818cf8" />
        ) : (
          <Sun size={24} className={styles.sunIcon} color="#94a3b8" />
        )}
        <span className={styles.logoText}>Ponto de Luz</span>
      </div>
     
      <nav className={styles.navLinks}>
        <a href="#">Explorar</a>
        <a href="#">Minhas Favoritas</a>
        <button className={styles.addBtn}>
          <Plus size={18} /> Deixar Mensagem
        </button>
      </nav>
    </header>
  );
}