import { useState } from "react";

interface IPlantsMetadata {
  content: IPlant[]
  page: {
    size: number
    number: number
    totalElements: number
    totalPages: number
  }
}

export interface IPlant {
  id: number
  version: number
  name: string
  description: string
  createdAt: string
  updatedAt: string
}

export default function usePlants(): [
  IPlantsMetadata | undefined,
  CallableFunction,
  IPlant | undefined,
  CallableFunction,
  CallableFunction,
  CallableFunction,
] {
  const [plantsMetadata, setPlantsMetadata] = useState<IPlantsMetadata | undefined>();
  const [plantDetails, setPlantDetails] = useState<IPlant | undefined>();

  async function getPlants() {
    console.info("Fetching plants...");

    try {
      const response = await fetch("http://localhost:8080/api/v1/plants");
      const data = await response.json();

      setPlantsMetadata(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getPlant(id: number) {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/plants/${id}`);
      const data = await response.json();

      setPlantDetails(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function deletePlant(id: number) {
    try {
      fetch(`http://localhost:8080/api/v1/plants/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.log(error);
    }
  }

  function clearPlantDetails() {
    setPlantDetails(undefined);
  }

  return [
    plantsMetadata,
    getPlants,
    plantDetails,
    getPlant,
    deletePlant,
    clearPlantDetails,
  ];
}
