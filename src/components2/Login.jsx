import styles from "./Login.module.css";
import { Link } from "react-router-dom";

export function Login() {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h2>Login</h2>
        <div className={styles.formGroup}>
          <label htmlFor="email">E-mail</label>
          <input type="email" id="email" className={styles.input} placeholder="seuemail@exemplo.com" />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Senha</label>
          <input type="password" id="password" className={styles.input} placeholder="********" />
        </div>
        <button type="submit" className={styles.button}>
          Entrar
        </button>
        <p className={styles.linkText}>
          Não tem uma conta? <Link to="/register">Cadastre-se</Link>
        </p>
      </form>
    </div>
  );
}