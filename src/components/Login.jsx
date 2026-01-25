import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";
import styles from "./Login.module.css";

export function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  
  const { login, signUp } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        // Se o nome for vazio, vira "Anônimo" conforme seu pedido
        const finalName = name.trim() === "" ? "Anônimo" : name;
        const { error } = await signUp(email, password, finalName);
        if (error) throw error;
        alert("Cadastro realizado!");
      } else {
        const { error } = await login(email, password);
        if (error) throw error;
      }
      navigate("/"); // Volta para exibir os arquivos na home
    } catch (err) {
      alert("Erro: " + err.message);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.card}>
        <h2>{isRegister ? "Criar Conta" : "Entrar"}</h2>
        <form onSubmit={handleAuth}>
          {isRegister && (
            <input 
              type="text" 
              placeholder="Seu Nome (Opcional)" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
          )}
          <input 
            type="email" 
            placeholder="E-mail" 
            required 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Senha" 
            required 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button type="submit" className={styles.btnPrimary}>
            {isRegister ? "Cadastrar" : "Acessar"}
          </button>
        </form>
        <p onClick={() => setIsRegister(!isRegister)} className={styles.switch}>
          {isRegister ? "Já tem conta? Faça Login" : "Não tem conta? Cadastre-se"}
        </p>
      </div>
    </div>
  );
}