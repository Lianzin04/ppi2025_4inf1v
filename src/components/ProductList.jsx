import styles from "./ProductList.module.css";
import { Product } from "./Product";
import { Hero } from "./Hero";
import { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { Moon, Sun } from "lucide-react";

export function ProductList({ isDark, setIsDark }) {
  const { products, loading } = useContext(CartContext);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <div className={styles.pageWrapper}>
      <main className={styles.contentContainer}>
        
        <div className={styles.toolbar}>
          <div className={styles.filterPills}>
            <button className={styles.pill}>Preciso de coragem</button>
            <button className={styles.pill}>Preciso de calma</button>
          </div>

          <div className={styles.themeToggle}>
            {/* REQUISITO 3: Ícone muda no switch conforme o tema */}
            {isDark ? <Moon size={18} /> : <Sun size={18} />}
            <span>{isDark ? "Modo Noturno" : "Modo Claro"}</span>
            <label className={styles.switch}>
              <input type="checkbox" checked={isDark} onChange={() => setIsDark(!isDark)} />
              <span className={styles.slider}></span>
            </label>
          </div>
        </div>

        {/* REQUISITO 1: Hero em camada superior (Sticky) */}
        <div className={styles.heroLayer}>
          <Hero />
        </div>

        {/* REQUISITO 1: Grid em camada inferior (Passa por trás) */}
        <div className={styles.gridLayer}>
          {!loading && products && products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}