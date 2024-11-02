import { useState } from "react";
import dayjs from "dayjs";

import styles from "@/style/components/PlantDetails.module.scss";

import { IPlant } from "@/hooks/usePlants";

import Dialog from "./ui/Dialog";
import Button from "./ui/Button";

interface IPlantDetailsProps {
  plant: IPlant
}

export default function PlantDetails(props: IPlantDetailsProps): JSX.Element {
  const { plant, } = props;
  const [showDialog, setShowDialog,] = useState<boolean>(false);

  function toggleDialog() {
    setShowDialog(!showDialog);
  }

  return (
    <>
      <div className={styles.main}>
        <h2>{plant.name}</h2>
        <p>{plant.description}</p>

        <div className={styles.dates}>
          <p>Created: {dayjs(plant.createdAt).format("DD-MM-YYYY HH:mm:ss")}</p>
          <p>Last updated: {dayjs(plant.updatedAt).format("DD-MM-YYYY HH:mm:ss")}</p>
        </div>

        <div className={styles.actions}>
          <Button>Update</Button>
          <Button onClick={toggleDialog}>Delete</Button>
        </div>
      </div>

      {showDialog && (
        <Dialog>
          <p>Are you sure you want to delete {plant.name}?</p>

          <div className={styles.dialog_buttons}>
            <Button>Yes</Button>
            <Button onClick={toggleDialog}>No</Button>
          </div>
        </Dialog>
      )}
    </>
  );
}
