import { useEffect, useState } from "react";
import dayjs from "dayjs";

import styles from "@/style/admin/PlantDetails.module.scss";

import { IPlant } from "@/hooks/usePlants";

import NewPlantForm from "./NewPlantForm";

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
  const [showUpdateForm, setShowUpdateForm] = useState<boolean>(false);

  useEffect(() => {
    if (open) {
      setInit(false);
    }
  }, [open]);

  function toggleUpdateForm() {
    setShowUpdateForm(latest =>!latest);
  }

  function updateHandler(name: string, description: string) {
    onUpdate(plant, name, description);
  }

  if (displayUpdateForm) {
    return (
      <div className={`${styles.main} ${open ? styles.open : (!init && styles.closed)}`}>
        <form>
          <div className={styles.name}>
            <label htmlFor="name">Name: </label>
            <input type="text" name="name" id="name" placeholder={plant.name} />
          </div>
          <div className={styles.description}>
            <label htmlFor="description">Description:</label>
            <textarea name="description" id="description" rows={4}>
              {plant.description}
            </textarea>
          </div>

          <button type="button">Submit</button>
        </form>

        <div className={styles.dates}>
          <p>Created: {dayjs(plant.createdAt).format("DD-MM-YYYY HH:mm:ss")}</p>
          <p>Last updated: {dayjs(plant.updatedAt).format("DD-MM-YYYY HH:mm:ss")}</p>
        </div>

        {showUpdateForm && (
          <NewPlantForm
            onSubmit={updateHandler}
            defaultName={plant.name}
            defaultDescription={plant.description}
          />
        )}
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

      {showUpdateForm && (
        <NewPlantForm
          onSubmit={updateHandler}
          defaultName={plant.name}
          defaultDescription={plant.description}
        />
      )}
    </div>
  );
}
