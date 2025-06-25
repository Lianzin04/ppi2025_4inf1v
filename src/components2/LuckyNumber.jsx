import { useState } from "react";
import styles from "./LuckyNumber.module.css";

export function LuckyNumber() {
    //REACYT HOOK - useState
//(equerda) função monitora, função que altera (direita)
    const [luckyNumber, setLuckyNumber] = useState(0);


    function handleClick() {
         setLuckyNumber(LuckyNumber + 1)
       setLuckyNumber = {}
    }

    return (
        <div className= {styles.container}>
            <h1> Contador = {LuckyNumber}</h1>
            <button className={styles.button} onClick={handleClick}> Clique!</button>
        </div>
    );
}