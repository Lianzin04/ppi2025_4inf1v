import styles from "./ProductList.module.css";
import { Product } from "./Product";
import { Hero } from "./Hero";
import { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";

export function ProductList({ isDark }) {
  // Puxamos os produtos e as funções de CRUD do contexto do Supabase
  const { products, loading, deleteMessage, updateMessage } = useContext(CartContext);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <div className={styles.pageWrapper}>
      <main className={styles.contentContainer}>
        {/* Card Principal (Hero) no topo */}
        <div className={styles.heroLayer}>
          <Hero />
        </div>

        {/* GRID DE MENSAGENS VINDAS DO SUPABASE */}
        <div className={styles.gridLayer}>
          {loading ? (
            <p style={{ textAlign: 'center', fontSize: '1.5rem', color: 'var(--text-secondary)' }}>
              Carregando mensagens de luz...
            </p>
          ) : (
            products && products.map((product) => (
              <Product 
                key={product.id} 
                product={product} 
                onDelete={deleteMessage}   // Passa a função de deletar para o card
                onUpdate={updateMessage}   // Passa a função de editar para o card
              />
            ))
          )}
          
          {!loading && products.length === 0 && (
            <p style={{ textAlign: 'center', gridColumn: '1/-1', color: 'var(--text-secondary)' }}>
              Nenhuma mensagem encontrada. Seja o primeiro a escrever!
            </p>
          )}
        </div>
      </main>
    </div>
  );
}