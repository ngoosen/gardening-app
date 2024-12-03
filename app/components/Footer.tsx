import styles from "@/style/components/Footer.module.scss";
import dayjs from "dayjs";
import Link from "next/link";

export default function Footer(): JSX.Element {
  return (
    <footer className={styles.main}>
      <p>
        © <Link href="https://github.com/ngoosen/gardening-app-front">Plant App</Link> - <span>{dayjs().format("YYYY")}</span>
      </p>
    </footer>
  );
}
