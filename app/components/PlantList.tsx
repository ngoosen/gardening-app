"use client";

import { useEffect } from "react";

import styles from "@/style/components/PlantList.module.scss";

import usePlants from "@/hooks/usePlants";

import PlantListItem from "./PlantListItem";
import PlantDetails from "./PlantDetails";

export default function PlantList(): JSX.Element {
  const [
    plants,
    getPlants,
    plantDetails,
    getPlant,
    deletePlant,
    clearPlantDetails,
  ] = usePlants();

  useEffect(() => {
    getPlants();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function clickHandler(id: number) {
    getPlant(id);
  }

  function deletePlantHandler(id: number) {
    deletePlant(id);
    clearPlantDetails();
    getPlants();
  }

  if (!plants?.content) {
    return <></>;
  }

  return (
    <div className={styles.container}>
      <ul className={styles.main}>
        {plants.content.map(plant => (
          <PlantListItem
          key={plant.id}
          plant={plant}
          onClick={clickHandler}
          />
        ))}
      </ul>

      {plantDetails && (
        <PlantDetails
          plant={plantDetails}
          onDelete={deletePlantHandler}
        />
      )}
    </div>
  );
}
