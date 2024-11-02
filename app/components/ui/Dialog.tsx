import styles from "@/style/components/ui/Dialog.module.scss";

interface IDialogProps {
  children: JSX.Element[] | JSX.Element
  onClose: CallableFunction
  className?: string
  xMark?: boolean
}

export default function Dialog(props: IDialogProps): JSX.Element {
  const { children, onClose, className, xMark, } = props;

  function closeHandler() {
    onClose();
  }

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.close_div} onClick={closeHandler}></div>

      <div className={styles.main}>
        {xMark && (
          <button className={styles.x_mark} onClick={closeHandler}>
            X
          </button>
        )}

        {children}
      </div>
    </div>
  );
}
