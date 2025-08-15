// components2/ProductAdm.js
import styles from "./ProductAdm.module.css";
import { useContext } from "react";
import { CartContext } from "../service/CartContext"; // 2. Importar o nosso contexto

export function ProductAdm() {
  const { products } = useContext(CartContext);

  return (
    <div className={styles.admContainer}>
      <h2>Gerenciamento de Produtos</h2>

      {/* Seção para Inserir Produto */}
      <div className={styles.section}>
        <h3>Adicionar Novo Produto</h3>
        <form className={styles.form}>
          <input type="text" placeholder="Nome do Produto" className={styles.input} />
          <textarea placeholder="Descrição do Produto" className={styles.input}></textarea>
          <input type="number" placeholder="Preço" className={styles.input} />
          <input type="text" placeholder="URL da Imagem" className={styles.input} />
          <button type="submit" className={styles.button}>Adicionar Produto</button>
        </form>
      </div>

      {/*Atualizar Produto */}
      <div className={styles.section}>
        <h3>Atualizar Produto Existente</h3>
        <form className={styles.form}>
          <select className={styles.input}>
            <option value="">Selecione um produto para editar</option>
            {/* */}
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.title}
              </option>
            ))}
          </select>
          <input type="text" placeholder="Novo Nome do Produto" className={styles.input} />
          <textarea placeholder="Nova Descrição" className={styles.input}></textarea>
          <input type="number" placeholder="Novo Preço" className={styles.input} />
          <button type="submit" className={styles.button}>Atualizar Produto</button>
        </form>
      </div>

      {/* Seção para Remover Produto */}
      <div className={styles.section}>
        <h3>Remover Produto</h3>
        <form className={styles.form}>
          <select className={styles.input}>
            <option value="">Selecione um produto para remover</option>
             {/* */}
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.title}
              </option>
            ))}
          </select>
          <button type="submit" className={`${styles.button} ${styles.removeButton}`}>
            Remover Produto
          </button>
        </form>
      </div>
    </div>
  );
}