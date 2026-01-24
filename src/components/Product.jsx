import styles from "./Product.module.css";
import { Heart, Bookmark } from "lucide-react"; // Bookmark faz mais sentido para salvar frases
import { useState } from "react";

export function Product({ product }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className={styles.productCard}>
      <span className={styles.categoryTag}>Mentalidade</span>
      <p className={styles.messageText}>"{product.description}"</p>
    </div>
  );
}