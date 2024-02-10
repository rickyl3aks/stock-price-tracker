import styles from "./page.module.css";
import GetData from "./UI/getData/getData";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <GetData />
      </div>
    </main>
  );
}
