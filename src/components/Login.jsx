import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { Eye, EyeOff } from "lucide-react"; // Importação do olhinho
import styles from "./Login.module.css";

export function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Estado para o olho
  
  const { login, signUp } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        const finalName = name.trim() === "" ? "Anônimo" : name;
        const { error } = await signUp(email, password, finalName);
        if (error) throw error;
        alert("Cadastro realizado!");
      } else {
        const { error } = await login(email, password);
        if (error) throw error;
      }
      navigate("/");
    } catch (err) {
      alert("Erro: " + err.message);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.card}>
        <h2>{isRegister ? "Criar Conta" : "Entrar"}</h2>
        
        {/* Ponto 1: Frase de login aumentada e centralizada */}
        <p className={styles.welcomeText}>
          Você precisa estar logado para espalhar sua luz no mundo
        </p>

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
          
          {/* Ponto 4: Container para o input de senha com olho */}
          <div className={styles.passwordWrapper}>
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Senha" 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
            <button 
              type="button" 
              className={styles.eyeBtn}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button type="submit" className={styles.btnPrimary}>
            {isRegister ? "Cadastrar" : "Acessar"}
          </button>
        </form>

        {/* Ponto 3: Link de switch aumentado */}
        <p onClick={() => setIsRegister(!isRegister)} className={styles.switch}>
          {isRegister ? "Já tem conta? Faça Login" : "Não tem conta? Cadastre-se"}
        </p>
      </div>
    </div>
  );
}