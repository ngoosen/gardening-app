import Link from "next/link";
import { Sprout } from "lucide-react";

import styles from "@/style/components/ui/Logo.module.scss";

interface ILogoProps {
  open: boolean
  onHover: CallableFunction
}

export default function Logo(props: ILogoProps): JSX.Element {
  const {
    open,
    onHover,
  } = props;

  function hoverHandler() {
    onHover();
  }

  return (
    <Link href="/" className={`${styles.main} ${open ? styles.open : ""}`} onMouseEnter={hoverHandler}>
      <div className={styles.logo}>
        <Sprout />
      </div>
      <div className={styles.title}>
        <h1>PlantApp</h1>
      </div>
    </Link>
  );
}
