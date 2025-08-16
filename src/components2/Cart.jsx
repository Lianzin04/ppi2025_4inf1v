import styles from "./Cart.module.css";
import { useContext } from "react";
import { CartContext } from "../service/CartContext";
import { Trash, Tag } from "lucide-react";
import { Link } from "react-router-dom";

export function Cart() {
  const { cart, updateQtyCart, removeFromCart, clearCart } =
    useContext(CartContext);

  const totalValue = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
  const installmentValue = totalValue / 10;
  const pixValue = totalValue * 0.9;
  const savings = totalValue - pixValue;

  const formatCurrency = (value) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };


  return (
    <div className={styles.cart}>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map((product, index) => (
              <li key={index} className={styles.cartItem}>
                <img src={product.thumbnail} alt={product.title} />
                <h3>{product.title}</h3>
                <p>{formatCurrency(product.price)}</p>
                <div className={styles.quantityControls}>
                  <button disabled={product.quantity <= 1} onClick={() => updateQtyCart(product.id, product.quantity - 1)} > - </button>
                  <span>{product.quantity}</span>
                  <button onClick={() => updateQtyCart(product.id, product.quantity + 1)} > + </button>
                </div>
                {/* O botão de remover item pertence a cada <li> */}
                <button onClick={() => removeFromCart(product.id)} className={styles.removeButton} > <Trash /> </button>
              </li>
            ))}
          </ul>

          
          <div className={styles.summaryContainer}>
            <div className={styles.summaryBox}>
              <h3 className={styles.summaryTitle}><Tag size={20} /> RESUMO</h3>
              
              <div className={styles.summaryRow}>
                <span>Valor dos Produtos:</span>
                <span className={styles.summaryValue}>{formatCurrency(totalValue)}</span>
              </div>
      
              <div className={styles.summaryInstallments}>
                <div className={styles.summaryRow}>
                  <span>Total a prazo:</span>
                  <span className={styles.summaryValue}>{formatCurrency(totalValue)}</span>
                </div>
                <span className={styles.installmentInfo}>(em até <strong>10x de {formatCurrency(installmentValue)}</strong> sem juros)</span>
              </div>
      
              <div className={styles.pixRow}>
                <div className={styles.summaryRow}>
                  <span>Valor à vista no <strong>PIX:</strong></span>
                  <span className={styles.pixValue}>{formatCurrency(pixValue)}</span>
                </div>
                <span className={styles.savingsInfo}>(Economize: <strong>{formatCurrency(savings)}</strong>)</span>
              </div>
            </div>
            <div className={styles.buttonGroup}>
                <Link to="/login">
                    <button className={styles.continueButton}>CONTINUAR</button>
                </Link>
                <Link to="/">
                    <button className={styles.backButton}>VOLTAR</button>
                </Link>
            </div>
          </div>
        </>
      )}
      {cart.length > 0 && (
        <button onClick={clearCart} className={styles.removeButton}>
          CLEAR CART <Trash className={styles.trashIcon}/>
        </button>
      )}
    </div>
  );
}