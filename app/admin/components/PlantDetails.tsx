import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";

import styles from "@/style/admin/PlantDetails.module.scss";

import { IPlant } from "@/hooks/usePlants";

interface IPlantDetailsProps {
  plant: IPlant
  open: boolean
  displayUpdateForm: boolean
  onUpdate: CallableFunction
}

export default function PlantDetails(props: IPlantDetailsProps): JSX.Element {
  const {
    plant,
    open,
    displayUpdateForm,
    onUpdate,
  } = props;
  const [init, setInit] = useState<boolean>(true);

  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open) {
      setInit(false);
    }
  }, [open]);

  useEffect(() => {
    if (displayUpdateForm && nameRef.current) {
      nameRef.current.focus();
    }
  }, [displayUpdateForm]);

  function submitHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const name = nameRef.current?.value.trim();
    const description = descriptionRef.current?.value.trim();

    onUpdate({
      ...plant,
      name,
      description
    });
  }

  if (displayUpdateForm) {
    return (
      <div className={`${styles.main} ${open ? styles.open : (!init && styles.closed)}`}>
        <form>
          <div className={styles.name}>
            <label htmlFor="name">Name: </label>
            <input ref={nameRef} type="text" name="name" id="name" placeholder={plant.name} />
          </div>
          <div className={styles.description}>
            <label htmlFor="description">Description:</label>
            <textarea ref={descriptionRef} name="description" id="description" rows={4} defaultValue={plant.description} />
          </div>

          <button type="button" onClick={submitHandler}>Submit</button>
        </form>

        <div className={styles.dates}>
          <p>Created: {dayjs(plant.createdAt).format("DD-MM-YYYY HH:mm:ss")}</p>
          <p>Last updated: {dayjs(plant.updatedAt).format("DD-MM-YYYY HH:mm:ss")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.main} ${open ? styles.open : (!init && styles.closed)}`}>
      <h2>{plant.name}</h2>
      <p>{plant.description}</p>

      <div className={styles.dates}>
        <p>Created: {dayjs(plant.createdAt).format("DD-MM-YYYY HH:mm:ss")}</p>
        <p>Last updated: {dayjs(plant.updatedAt).format("DD-MM-YYYY HH:mm:ss")}</p>
      </div>
    </div>
  );
}
