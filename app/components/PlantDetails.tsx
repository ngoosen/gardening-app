import dayjs from "dayjs";

import styles from "@/style/components/PlantDetails.module.scss";

import { IPlant } from "@/hooks/usePlants";

import Dialog from "./ui/Dialog";

interface IPlantDetailsProps {
  plant: IPlant
}

export default function plantDetails(props: IPlantDetailsProps): JSX.Element {
  const { plant, } = props;

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
          <button>Update</button>
          <button>Delete</button>
        </div>
      </div>

      <Dialog>
        <p>Are you sure you want to delete this?</p>

        <div>
          <button>Yes</button>
          <button>No</button>
        </div>
      </Dialog>
    </>
  );
}
