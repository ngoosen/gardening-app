import styles from "@/style/components/ui/Button.module.scss";

interface IButtonProps {
  children: string
  onClick?: CallableFunction
  className?: string
}

export default function Button(props: IButtonProps): JSX.Element {
  const {
    children,
    onClick,
    className,
  } = props;

  function clickHandler() {
    if (onClick) {
      onClick();
    }
  }

  return (
    <button
      className={`${styles.main} ${className}`}
      onClick={clickHandler}
    >
      {children}
    </button>
  );
}
