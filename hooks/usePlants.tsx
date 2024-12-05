import { useState } from "react";

import { mockPlantsData } from "@/lib/mockPlantsData";

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

export enum ORDER {
  ASC = "asc",
  DESC = "desc"
}

export default function usePlants(): [
  IPlantsMetadata | undefined,
  CallableFunction,
  IPlant | undefined,
  CallableFunction,
  CallableFunction,
  CallableFunction,
  CallableFunction,
  CallableFunction,
] {
  const [plantsMetadata, setPlantsMetadata] = useState<IPlantsMetadata | undefined>();
  const [plantDetails, setPlantDetails] = useState<IPlant | undefined>();

  async function getPlants() {
    console.info("Fetching plants...");

    try {
      //* With API running
      // const response = await fetch("http://localhost:8080/api/v1/plants");
      // const data = await response.json();

      //* Without API running
      const data = mockPlantsData;

      setPlantsMetadata(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getPlant(id: number) {
    try {
      //* With API running
      // const response = await fetch(`http://localhost:8080/api/v1/plants/${id}`);
      // const data = await response.json();

      //* Without API running
      const data = mockPlantsData.content[id - 1];
      setPlantDetails(undefined);

      setPlantDetails(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function addPlant(newPlant: IPlant) {
    try {
      //* With API running
      // await fetch("http://localhost:8080/api/v1/plants", {
      //     method: "POST",
      //     headers: {
      //         "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(newPlant),
      // });

      // getPlants();

      //* Without API running
      newPlant = {
        ...newPlant,
        id: mockPlantsData.content.length + 1
      };

      const newContent = {
        ...mockPlantsData,
        content: [
          ...mockPlantsData.content,
          newPlant,
        ]
      };

      mockPlantsData.content.push(newPlant);
      setPlantsMetadata(newContent);
    } catch (error) {
      console.log(error);
    }
  }

  async function updatePlant(newPlant: IPlant) {
    try {
      //* With API running
      // await fetch(`http://localhost:8080/api/v1/plants/${newPlant.id}`, {
      //   method: "PUT",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(newPlant),
      // });

      // getPlants();

      //* Without API running
      if (plantsMetadata) {
        const newContent = {
          ...plantsMetadata,
        };

        newContent.content[newPlant.id - 1] = {
          ...newPlant,
        };

        setPlantsMetadata(newContent);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function deletePlant(id: number) {
    try {
      //* With API running
      // await fetch(`http://localhost:8080/api/v1/plants/${id}`, {
      //   method: "DELETE",
      // });
      // getPlants();

      //* Without API running
      if (plantsMetadata) {
        const newContent = plantsMetadata;

        const start = newContent.content.slice(0, id - 1);
        const end = newContent.content.slice(id);

        newContent.content = [
          ...start,
          ...end,
        ]

        setPlantsMetadata({
          ...newContent
        });
      }
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
    addPlant,
    updatePlant,
    deletePlant,
    clearPlantDetails,
  ];
}
