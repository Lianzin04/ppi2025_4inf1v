import styles from "./Cart.module.css";

export function Cart({ cart, updateQuantity, clearCart }) {
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const descontoPix = 0.10;
  const valorPix = total * (1 - descontoPix);
  const economia = total - valorPix;

  return (
    <div className={styles.containerCarrinho}>
      <div className={styles.cart}>
        <h2>Seu Carrinho</h2>
        {cart.length === 0 ? (
          <p>O carrinho está vazio.</p>
        ) : (
          <>
            <button className={styles.clearButton} onClick={clearCart}>
              Remover Todos os Produtos
            </button>
            <ul className={styles.itemList}>
              {cart.map((product, index) => (
                <li key={index} className={styles.cartItem}>
                  <img src={product.thumbnail} alt={product.title} />
                  <div className={styles.details}>
                    <h3>{product.title}</h3>
                    <p>Preço: R$ {product.price.toFixed(2)}</p>
                    <div className={styles.quantity}>
                      <button onClick={() => updateQuantity(product.id, -1)}>-</button>
                      <span>{product.quantity}</span>
                      <button onClick={() => updateQuantity(product.id, 1)}>+</button>
                    </div>
                    <p>Subtotal: R$ {(product.price * product.quantity).toFixed(2)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* Caixa lateral com resumo */}
      <div className={styles.resumo}>
        <h3>RESUMO</h3>
        <p style={{ fontSize: "0.95rem", color: "#555" }}>
  (em até 10x de R$ {(total / 10).toFixed(2)} sem juros)
</p>
        <p>Valor dos Produtos: <strong>R$ {total.toFixed(2)}</strong></p>
        <p>Total a prazo: <strong>R$ {total.toFixed(2)}</strong></p>
        <p className={styles.pix}>
          Valor à vista no <strong>PIX:</strong> <span className={styles.valorPix}>R$ {valorPix.toFixed(2)}</span>
          <br />
          <span className={styles.economia}>(Economize: R$ {economia.toFixed(2)})</span>
        </p>
        <button className={styles.botaoContinuar}>CONTINUAR</button>
        <button className={styles.botaoVoltar}>VOLTAR</button>
      </div>
    </div>
  );
}