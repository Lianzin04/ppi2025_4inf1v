import styles from "./Product.module.css";

export function Product({ product }) {
  return (
    <div className={styles.productCard}>
      {/* Alterado de .description para .content para bater com seu SQL */}
      <p className={styles.messageText}>"{product.content}"</p>
      
      <div className={styles.cardFooter}>
         <small>Por: {product.author}</small>
      </div>
    </div>
  );
}