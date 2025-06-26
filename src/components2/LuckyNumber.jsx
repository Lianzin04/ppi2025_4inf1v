import { useState } from "react";
import styles from "./LuckyNumber.module.css";

export function LuckyNumber() {
  //REACT HOOK - useState()
  const [luckyNumber, setLuckyNumber] = useState(0);
  const [array, setArray] = useState([]);
  const [message, setMessage] = useState("");

  function handleClick() {
    var n = Math.ceil(Math.random() * 31);
    setLuckyNumber(n);

    if (array.includes(n)) {
      setMessage(`O número ${n} já foi sorteado!`);
    } else {
      setMessage("");
      setArray([...array, n]);
    }
  }

  return (
    <div className={styles.container}>
      {luckyNumber ? (
      <h1 style={{ color: 'pink' }}> Número sorteado = {luckyNumber}</h1>
      ) : (
       <h1 style={{ color: 'pink' }}>Número sorteado = {luckyNumber}</h1>
      )}
      <div className={styles.buttons}>
        <button className={styles.button} onClick={handleClick}>
          SORTEAR!
        </button>
        <button
          className={styles.button}
          onClick={() => {
            setLuckyNumber(0);
            setArray([]);
            setMessage("");
          }}
        >
          RESETAR!
        </button>
        
      </div>
      {message && <h1>{message}</h1>}
      {array.length > 0 && (
        <div>
          <h1>Números já sorteados do Array:</h1>
          <h1>[{array.toString()}]</h1>
        </div>
      )}
    </div>
  );
}