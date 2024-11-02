import styles from "@/style/components/PlantDetails.module.scss";

import { IPlant } from "@/hooks/usePlants";

interface IPlantDetailsProps {
  plant: IPlant
}

export default function plantDetails(props: IPlantDetailsProps): JSX.Element {
  const { plant, } = props;
  console.log("🚀 ~ plantDetails ~ plant:", plant);

  return (
    <div className={styles.main}>
      <h2>{plant.name}</h2>
      <p>{plant.description}</p>

      <div className={styles.dates}>
        <p>Created: {plant.createdAt}</p>
        <p>Last updated: {plant.updatedAt}</p>
      </div>

      <div className={styles.actions}>
        <button>Update</button>
        <button>Delete</button>
      </div>
    </div>
  );
}
