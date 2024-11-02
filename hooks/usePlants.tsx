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
  CallableFunction
] {
  const [plantsMetadata, setPlantsMetadata] = useState<IPlantsMetadata | undefined>();
  const [plantDetails, setPlantDetails] = useState<IPlant | undefined>();

  async function getPlants() {
    console.info("Fetching plants...");

    const response = await fetch("http://localhost:8080/api/v1/plants");
    const data = await response.json();

    setPlantsMetadata(data);
  }

  async function getPlant(id: number) {
    const response = await fetch(`http://localhost:8080/api/v1/plants/${id}`);
    const data = await response.json();

    setPlantDetails(data);
  }

  return [
    plantsMetadata,
    getPlants,
    plantDetails,
    getPlant
  ];
}
