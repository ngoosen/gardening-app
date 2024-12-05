import { useEffect, useState } from "react";
import dayjs from "dayjs";

import styles from "@/style/admin/PlantDetails.module.scss";

import { IPlant } from "@/hooks/usePlants";

import NewPlantForm from "./NewPlantForm";

interface IPlantDetailsProps {
  plant: IPlant
  open: boolean
}

export default function PlantDetails(props: IPlantDetailsProps): JSX.Element {
  const { plant, open, } = props;
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
    console.log("🚀 ~ updateHandler ~ name:", name);
    console.log("🚀 ~ updateHandler ~ description:", description);
    // onUpdate(plant, name, description);
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
