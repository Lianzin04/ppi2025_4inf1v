import styles from "./MyGrid.module.css";

export function MyGrid() {
  return (
    <div className={styles.container}>
      <header className={styles.header1} />
      <div className={styles.main}>
        <div className={styles.grid}>
          <div className={styles.card}>
            <img src="https://picsum.photos/200/300?random=1" />
            <h2>Card 0</h2>
            <p>This is the first card.</p>
          </div>
          <div className={styles.card}>
            <img src="https://picsum.photos/200/300?random=1"></img>
            <h2>Card 1</h2>
            <p>This is the second card.</p>
          </div>
          <div className={styles.card}>
            <img src="https://picsum.photos/200/300?random=1"></img>
            <h2>Card 2</h2>
            <p>This is the third card.</p>
          </div>
             <div className={styles.card}>
            <img src="https://picsum.photos/200/300?random=1"></img>
            <h2>Card 3</h2>
            <p>This is the third card.</p>
          </div>
             <div className={styles.card}>
            <img src="https://picsum.photos/200/300?random=1"></img>
            <h2>Card 4</h2>
            <p>This is the third card.</p>
          </div>
        </div>
      </div>
      <footer className={styles.footer} />
    </div>


  );
}
