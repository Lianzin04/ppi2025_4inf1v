import styles from "./Header.module.css";
import { Sun, Moon, Plus } from "lucide-react";

export function Header({ isDark, setIsDark }) {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Sun size={30} color="#818cf8" /> 
        <span>Cantinho de alguma coisa</span>

      </div>
      <div className={styles.themeToggle} onClick={() => setIsDark(!isDark)}>
        {isDark ? <Sun size={30} /> : <Moon size={20} />}
        <span>{isDark ? "Modo Claro" : "Modo Noturno"}</span>
      </div>
    </header>
  );
}