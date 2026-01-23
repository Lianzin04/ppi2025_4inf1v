import styles from "./Product.module.css";
import { Heart, Bookmark } from "lucide-react"; // Bookmark faz mais sentido para salvar frases
import { useState } from "react";

export function Product({ product }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className={styles.productCard}>
      <span className={styles.categoryTag}>Mentalidade</span>
      <p className={styles.messageText}>"{product.description}"</p>
     
      <div className={styles.cardFooter}>
        <div className={styles.likes}>
          <button 
            className={styles.iconBtn} 
            onClick={() => setLiked(!liked)}
          >
            <Heart size={20} fill={liked ? "var(--accent)" : "none"} color="var(--accent)" />
          </button>
          <span>{liked ? 13 : 12}</span>
        </div>
        <button className={styles.saveBtn}>
          <Bookmark size={18} /> Salvar
        </button>
      </div>
    </div>
  );
}