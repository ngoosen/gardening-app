import styles from "@/style/components/ui/Button.module.scss";

interface IButtonProps {
  children: string
  className?: string
}

export default function Button(props: IButtonProps): JSX.Element {
  const { children, className, } = props;

  return (
    <button className={`${styles.main} ${className}`}>
      {children}
    </button>
  );
}
