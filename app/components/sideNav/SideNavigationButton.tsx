import styles from "@/style/components/sideNav/SideNavigationButton.module.scss";

interface ISideNavigationButtonProps {
  buttonIcon: JSX.Element
  title: string;
  open: boolean
}

export default function SideNavigationButton(props: ISideNavigationButtonProps): JSX.Element {
  const {
    buttonIcon,
    title,
    open,
  } = props;

  return (
    <li className={`${styles.main} ${open ? styles.open : ""}`}>
      <button>
        <div className={styles.icon}>
          {buttonIcon}
        </div>
        <div className={styles.title}>
          <p>{title}</p>
        </div>
      </button>
    </li>
  );
}
