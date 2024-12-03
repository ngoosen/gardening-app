import styles from "@/style/admin/PlantListItem.module.scss";

import { IPlant } from "@/hooks/usePlants";
import dayjs from "dayjs";

interface IPlantListItemProps {
  plant: IPlant
  onClick: CallableFunction
}

export default function PlantListItem(props: IPlantListItemProps): JSX.Element {
  const { plant, onClick, } = props;

  function clickHandler() {
    onClick(plant.id);
  }

  return (
    <li className={styles.main} onClick={clickHandler}>
      <div className={styles.data}>
        <p className={styles.plant_name}>
          {plant.name}
        </p>
        <p className={styles.last_update}>
          {dayjs(plant.updatedAt).format("YYYY-MM-DD HH:mm")}
        </p>
      </div>
      <div className={styles.actions}></div>
    </li>
  );
}
