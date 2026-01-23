import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.heroContainer}>
      <div className={styles.heroCard}>
        <p className={styles.quote}>
          “O que você diria para si mesmo se soubesse que não pode falhar?”
        </p>
      </div>
    </section>
  );
}