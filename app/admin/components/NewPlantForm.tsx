import { useRef } from "react";

import styles from "@/style/admin/NewPlantForm.module.scss";

interface IPlantAddFormProps {
  onSubmit: CallableFunction
  defaultName?: string
  defaultDescription?: string
}

export default function NewPlantForm(props: IPlantAddFormProps): JSX.Element {
  const { onSubmit, defaultName, defaultDescription, } = props;

  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  function submitHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const name = nameRef.current?.value;
    const description = descriptionRef.current?.value;

    onSubmit(name, description);
  }

  return (
    <form className={styles.main}>
      <div className={styles.name}>
        <label htmlFor="name">Name</label>
        <input ref={nameRef} type="text" name="name" id="name" defaultValue={defaultName ?? ""} />
      </div>

      <div className={styles.description}>
        <label htmlFor="description">Description</label>
        <textarea ref={descriptionRef} name="description" id="description" rows={3} defaultValue={defaultDescription ?? ""} />
      </div>

      <button className={styles.submit_button} onClick={submitHandler}>Submit</button>
    </form>
  );
}
