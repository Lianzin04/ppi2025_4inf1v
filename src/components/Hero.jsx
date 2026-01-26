import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.heroContainer}>
      <div className={styles.heroCard}>
        <p className={styles.quote}>
          “Seja a luz no dia de alguém. Deixe sua mensagem!”
        </p>
      </div>
    </section>
  );
}