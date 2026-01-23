import styles from "./Header.module.css";
import { Sun, Moon, Plus } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [dark, setDark] = useState(false);

  const toggleTheme = () => {
    setDark(!dark);
    document.documentElement.setAttribute("data-theme", !dark ? "dark" : "light");
  };

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <div className={styles.logo}>
          <Sun size={24} /> <span>Ponto de Luz</span>
        </div>
        <nav className={styles.nav}>
          <span>Explorar</span>
          <span>Minhas Favoritas</span>
          <button className={styles.addBtn}><Plus size={16}/> Deixar Mensagem</button>
        </nav>
      </div>
      
      <div className={styles.filterBar}>
        <div className={styles.pills}>
          <span className={styles.activePill}>Preciso de coragem</span>
          <span>Preciso de calma</span>
          <span>Quero refletir</span>
        </div>
        <div className={styles.themeToggle}>
          <Moon size={18} />
          <span>Modo Noturno</span>
          <input type="checkbox" onChange={toggleTheme} />
        </div>
      </div>
    </header>
  );
}