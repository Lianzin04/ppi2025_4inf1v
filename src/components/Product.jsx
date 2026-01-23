import styles from "./Product.module.css";
import { Heart, Star } from "lucide-react";

export function Product({ product }) {
  return (
    <div className={styles.productCard}>
      <span className={styles.categoryTag}>{product.title}</span>
      <p className={styles.messageText}>{product.description}</p>
      
      <div className={styles.cardFooter}>
        <div className={styles.likes}>
          <Heart size={18} fill="#a5b4fc" color="#a5b4fc" />
          <Heart size={18} color="#a5b4fc" />
          <span>12</span>
        </div>
        <button className={styles.saveBtn}>
          <Star size={18} /> Salvar
        </button>
      </div>
    </div>
  );
}