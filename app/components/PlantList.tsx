"use client";

import styles from "@/style/components/PlantList.module.scss";

import usePlants, { IPlant } from "@/hooks/usePlants";

import PlantListItem from "./PlantListItem";

export default function PlantList(props: { plants: IPlant[]}) {
  const { plants, } = props;
  const [,, getPlant,] = usePlants();

  async function clickHandler(id: number) {
    getPlant(id);
  }

  return (
    <ul className={styles.main}>
      {plants.map(plant => (
        <PlantListItem
          key={plant.id}
          plant={plant}
          onClick={clickHandler}
        />
      ))}
    </ul>
  );
}
