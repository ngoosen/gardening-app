import styles from "@/style/components/dashboard/Dashboard.module.scss";

export default function Dashboard(): JSX.Element {
  return (
    <div className={styles.main}>
      <div className={styles.title}>
        <h2>Welcome to</h2>
        <h1>Plant App</h1>
      </div>
      <div className={styles.articles}>
        <div className={styles.placeholder}></div>
        <div className={styles.placeholder}></div>
        <div className={styles.placeholder}></div>
        <div className={styles.placeholder}></div>
        <div className={styles.placeholder}></div>
        <div className={styles.placeholder}></div>
      </div>
    </div>
  );
}
