"use client";

import styles from "@/style/components/PlantList.module.scss";

import usePlants, { IPlant } from "@/hooks/usePlants";

import PlantListItem from "./PlantListItem";
import PlantDetails from "./PlantDetails";

export default function PlantList(props: { plants: IPlant[]}): JSX.Element {
  const { plants, } = props;
  const [,, plantDetails, getPlant,] = usePlants();

  async function clickHandler(id: number) {
    getPlant(id);
  }

  return (
    <div className={styles.container}>
      <ul className={styles.main}>
        {plants.map(plant => (
          <PlantListItem
          key={plant.id}
          plant={plant}
          onClick={clickHandler}
          />
        ))}
      </ul>

      {plantDetails && <PlantDetails plant={plantDetails} />}
    </div>
  );
}
