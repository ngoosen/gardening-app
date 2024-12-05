import { useState } from "react";
import dayjs from "dayjs";
import { Pencil, Trash2 } from "lucide-react";

import styles from "@/style/admin/PlantListItem.module.scss";

import { IPlant } from "@/hooks/usePlants";

import PlantDetails from "./PlantDetails";

interface IPlantListItemProps {
  plant: IPlant
  displayDetails: boolean
  onClick: CallableFunction
  onDelete: CallableFunction
}

export default function PlantListItem(props: IPlantListItemProps): JSX.Element {
  const { plant, displayDetails, onClick, onDelete, } = props;
  const [displayUpdateForm, setDisplayUpdateForm] = useState<boolean>(false);

  function clickHandler() {
    onClick(plant.id);
  }

  function deleteHandler() {
    onDelete(plant.id);
  }

  function toggleUpdateForm() {
    setDisplayUpdateForm(latest => !latest);
  }

  function updateHandler(plant: IPlant, name: string, description: string) {
    //
  }

  return (
    <li>
      <div className={styles.main}>
        <div className={styles.data} onClick={clickHandler}>
          <p className={styles.plant_name}>
            {plant.name}
          </p>
          <p className={styles.last_update}>
            {dayjs(plant.updatedAt).format("YYYY-MM-DD HH:mm")}
          </p>
        </div>
        <div className={styles.actions}>
          <button className={displayUpdateForm ? styles.updating : ""} onClick={toggleUpdateForm}>
            <Pencil />
          </button>
          <button onClick={deleteHandler}>
            <Trash2 />
          </button>
        </div>
      </div>

      <PlantDetails
        plant={plant}
        open={displayDetails}
        displayUpdateForm={displayUpdateForm}
        onUpdate={updateHandler}
      />
    </li>
  );
}
