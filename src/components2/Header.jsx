import styles from "./Header.module.css";

export function Header({ cart }) {
  return (
    <div className={styles.container}>
      <h1>TJA Megastore</h1>
      <div className={styles.cartInfo}>
        {cart.length > 0 && <p>{cart.length} products</p>}
        <p>Total: $ {cart.reduce((total, product) => total + product.price, 0).toFixed(2)}</p>
      </div>
    </div>
  );
}