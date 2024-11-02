"use client";

import { useEffect } from "react";
import dayjs from "dayjs";

import styles from "@/style/components/PlantList.module.scss";

import usePlants, { IPlant } from "@/hooks/usePlants";

import PlantListItem from "./PlantListItem";
import PlantDetails from "./PlantDetails";
import PlantAddForm from "./NewPlantForm";

export default function PlantList(): JSX.Element {
  const [
    plants,
    getPlants,
    plantDetails,
    getPlant,
    addPlant,
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
  }

  function addPlantHandler(name: string, description: string) {
    addPlant({
      id: 0,
      version: 0,
      name,
      description,
      createdAt: dayjs().toISOString(),
      updatedAt: dayjs().toISOString(),
    });
  }

  if (!plants?.content) {
    return <></>;
  }

  return (
    <>
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

      <PlantAddForm onSubmit={addPlantHandler} />
    </>
  );
}
