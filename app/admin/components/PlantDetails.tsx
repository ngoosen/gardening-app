import { useState } from "react";
import dayjs from "dayjs";

import styles from "@/style/admin/PlantDetails.module.scss";

import { IPlant } from "@/hooks/usePlants";

import NewPlantForm from "./NewPlantForm";
import Button from "@/app/components/ui/Button";
import Dialog from "@/app/components/ui/Dialog";

interface IPlantDetailsProps {
  plant: IPlant
  onUpdate: CallableFunction
  onDelete: CallableFunction
}

export default function PlantDetails(props: IPlantDetailsProps): JSX.Element {
  const { plant, onUpdate, onDelete, } = props;
  const [showDialog, setShowDialog,] = useState<boolean>(false);
  const [showUpdateForm, setShowUpdateForm] = useState<boolean>(false);

  function toggleDialog() {
    setShowDialog(latest => !latest);
  }

  function toggleUpdateForm() {
    setShowUpdateForm(latest =>!latest);
  }

  function deleteHandler() {
    onDelete(plant.id);
  }

  function updateHandler(name: string, description: string) {
    onUpdate(plant, name, description);
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
          <Button onClick={toggleUpdateForm}>Update</Button>
          <Button onClick={toggleDialog}>Delete</Button>
        </div>

        {showUpdateForm && (
          <NewPlantForm
            onSubmit={updateHandler}
            defaultName={plant.name}
            defaultDescription={plant.description}
          />
        )}
      </div>

      {showDialog && (
        <Dialog onClose={toggleDialog}>
          <p>Are you sure you want to delete {plant.name}?</p>

          <div className={styles.dialog_buttons}>
            <Button onClick={deleteHandler} className={styles.confirm}>Yes</Button>
            <Button onClick={toggleDialog}>No</Button>
          </div>
        </Dialog>
      )}
    </>
  );
}
