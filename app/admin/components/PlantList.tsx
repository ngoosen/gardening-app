"use client";

import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";

import styles from "@/style/admin/PlantList.module.scss";

import usePlants, { IPlant, ORDER } from "@/hooks/usePlants";

import PlantListFilter from "./PlantListFilter";
import PlantListItem from "./PlantListItem";
import PlantAddForm from "./NewPlantForm";
import Button from "@/app/components/ui/Button";
import Dialog from "@/app/components/ui/Dialog";

export default function PlantList(): JSX.Element {
  const [
    plants,
    getPlants,
    ,
    ,
    addPlant,
    updatePlant,
    deletePlant,
  ] = usePlants();

  const [displayedPlants, setDisplayedPlants] = useState<IPlant[]>([]);

  const [displayedPlantDetails, setDisplayedPlantDetails] = useState<number | undefined>();
  const [displayedPlantUpdateForm, setDisplayedPlantUpdateForm] = useState<number | undefined>();

  const [toggleDeleteDialog, setToggleDeleteDialog] = useState<boolean>(false);
  const [showAddPlantForm, setShowAddPlantForm] = useState<boolean>(false);

  const selectedPlantId = useRef<number | null>(null);

  useEffect(() => {
    getPlants();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (plants?.content) {
      setDisplayedPlants(plants.content);
    }
  }, [plants]);

  function clickHandler(id: number) {
    setDisplayedPlantDetails(latest => {
      if (latest === id) {
        setDisplayedPlantUpdateForm(undefined);
        return undefined;
      } else {
        return id;
      }
    });
  }

  function toggleDeletePlantDialog(id: number) {
    setToggleDeleteDialog(latest => !latest);
    selectedPlantId.current = id;
  }

  function deletePlantHandler() {
    deletePlant(selectedPlantId.current);
    selectedPlantId.current = null;
    setToggleDeleteDialog(false);
  }

  function toggleAddPlantForm() {
    setShowAddPlantForm(latest => !latest);
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

  function toggleUpdateHandler(id: number) {
    setDisplayedPlantDetails(id);

    setDisplayedPlantUpdateForm(latest => {
      if (latest === id) {
        return undefined;
      } else {
        return id;
      }
    });
  }

  function updatePlantHandler(updatedPlant: IPlant) {
    updatePlant(updatedPlant);
    setDisplayedPlantUpdateForm(undefined);
  }

  function sortPlants(sortBy: string, order: ORDER) {
    setDisplayedPlants(latest => {
      const sorted = [...latest];

      if (sortBy === "name") {
        sorted.sort((plant1: IPlant, plant2: IPlant) => {
          if (plant1.name > plant2.name) return 1;
          if (plant1.name < plant2.name) return -1;
          return 0;
        });
      }

      if (sortBy === "update") {
        sorted.sort((plant1: IPlant, plant2: IPlant) => {
          if (dayjs(plant1.updatedAt).isAfter(dayjs(plant2.updatedAt))) return 1;
          if (dayjs(plant1.updatedAt).isBefore(dayjs(plant2.updatedAt))) return -1;
          return 0;
        });
      }

      if (order === ORDER.ASC) {
        sorted.reverse();
      }

      return sorted;
    });
  }

  if (!displayedPlants) {
    return <></>;
  }

  return (
    <>
      <div className={styles.container}>
        <PlantListFilter onSort={sortPlants} />

        <ul className={styles.main}>
          {displayedPlants.map(plant => (
              <PlantListItem
              key={plant.id}
              plant={plant}
              displayDetails={displayedPlantDetails === plant.id}
              displayUpdateForm={displayedPlantUpdateForm === plant.id}
              onClick={clickHandler}
              onDelete={toggleDeletePlantDialog}
              onToggleUpdate={toggleUpdateHandler}
              onUpdate={updatePlantHandler}
            />
          ))}
        </ul>

        {toggleDeleteDialog && (
          <Dialog onClose={() => setToggleDeleteDialog(false)}>
            <p>Are you sure you want to delete this plant?</p>
            <div>
              <Button onClick={deletePlantHandler}>
                Yes
              </Button>
              <Button onClick={() => setToggleDeleteDialog(false)}>
                No
              </Button>
            </div>
          </Dialog>
        )}
      </div>

      <div className={styles.actions}>
        <Button className={styles.add_plant_toggle_button} onClick={toggleAddPlantForm}>
          Add new plant
        </Button>

        {showAddPlantForm && (
          <PlantAddForm onSubmit={addPlantHandler} />
        )}
      </div>
    </>
  );
}
