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

export default function usePlants(): [IPlantsMetadata | undefined, CallableFunction, CallableFunction] {
  const [plantsMetadata, setPlantsMetadata] = useState<IPlantsMetadata | undefined>();

  async function getPlants() {
    console.info("Fetching plants...");

    const response = await fetch("http://localhost:8080/api/v1/plants");
    const data = await response.json();

    setPlantsMetadata(data);
  }

  async function getPlant(id: number) {
    const response = await fetch(`http://localhost:8080/api/v1/plants/${id}`);
    const data = await response.json();
    console.log("🚀 ~ getPlant ~ data:", data);
  }

  return [
    plantsMetadata,
    getPlants,
    getPlant
  ];
}
