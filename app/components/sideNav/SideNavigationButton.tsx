import Link from "next/link";

import styles from "@/style/components/sideNav/SideNavigationButton.module.scss";

interface ISideNavigationButtonProps {
  buttonIcon: JSX.Element
  title: string;
  open: boolean
  link: string
}

export default function SideNavigationButton(props: ISideNavigationButtonProps): JSX.Element {
  const {
    buttonIcon,
    title,
    open,
    link,
  } = props;

  return (
    <li className={`${styles.main} ${open ? styles.open : ""}`}>
      <Link href={link} style={{ textDecoration: "none", }}>
        <button>
          <div className={styles.icon}>
            {buttonIcon}
          </div>
          <div className={styles.title}>
            <p>{title}</p>
          </div>
        </button>
      </Link>
    </li>
  );
}
