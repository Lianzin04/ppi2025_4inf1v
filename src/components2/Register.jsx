import styles from "./Login.module.css";
import { Link } from "react-router-dom";

export function Register() {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h2>Cadastro de Usuário</h2>
        <div className={styles.formGroup}>
          <label htmlFor="name">Nome Completo</label>
          <input type="text" id="name" className={styles.input} placeholder="Seu Nome Completo" />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">E-mail</label>
          <input type="email" id="email" className={styles.input} placeholder="seuemail@exemplo.com" />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Senha</label>
          <input type="password" id="password" className={styles.input} placeholder="Crie uma senha forte" />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword">Confirmar Senha</label>
          <input type="password" id="confirmPassword" className={styles.input} placeholder="Repita a senha" />
        </div>
        <button type="submit" className={styles.button}>
          Cadastrar
        </button>
        <p className={styles.linkText}>
          Já tem uma conta? <Link to="/login">Faça login</Link>
        </p>
      </form>
    </div>
  );
}