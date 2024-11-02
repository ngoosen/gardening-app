import styles from "@/style/components/ui/Dialog.module.scss";

interface IDialogProps {
  children: JSX.Element[]
  className?: string
}

export default function Dialog(props: IDialogProps): JSX.Element {
  const { children, className, } = props;

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.main}>
        {children}
      </div>
    </div>
  );
}
