import dayjs from "dayjs";
import { Pencil, Trash2 } from "lucide-react";

import styles from "@/style/admin/PlantListItem.module.scss";

import { IPlant } from "@/hooks/usePlants";

interface IPlantListItemProps {
  plant: IPlant
  onClick: CallableFunction
  onDelete: CallableFunction
}

export default function PlantListItem(props: IPlantListItemProps): JSX.Element {
  const { plant, onClick, onDelete, } = props;

  function clickHandler() {
    onClick(plant.id);
  }

  function deleteHandler() {
    onDelete(plant.id);
  }

  return (
    <li className={styles.main}>
      <div className={styles.data} onClick={clickHandler}>
        <p className={styles.plant_name}>
          {plant.name}
        </p>
        <p className={styles.last_update}>
          {dayjs(plant.updatedAt).format("YYYY-MM-DD HH:mm")}
        </p>
      </div>
      <div className={styles.actions}>
        <button>
          <Pencil />
        </button>
        <button onClick={deleteHandler}>
          <Trash2 />
        </button>
      </div>
    </li>
  );
}
