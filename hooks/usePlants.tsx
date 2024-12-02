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

const enableMockData = process.env.NODE_ENV !== "production" && true;

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
      let data;

      if (enableMockData) {
        data = mockPlantsData;
      } else {
        const response = await fetch("http://localhost:8080/api/v1/plants");
        data = await response.json();
      }

      setPlantsMetadata(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getPlant(id: number) {
    try {
      let data;

      if (enableMockData) {
        data = mockPlantsData.content[id - 1];
        setPlantDetails(undefined);
      } else {
        const response = await fetch(`http://localhost:8080/api/v1/plants/${id}`);
        data = await response.json();
      }

      setPlantDetails(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function addPlant(newPlant: IPlant) {
    try {
      if (enableMockData) {
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
      } else {
        await fetch("http://localhost:8080/api/v1/plants", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
          },
          body: JSON.stringify(newPlant),
        });

        getPlants();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function updatePlant(newPlant: IPlant) {
    try {
      if (enableMockData && plantsMetadata) {
        const newContent = {
          ...plantsMetadata,
        };

        newContent.content[newPlant.id - 1] = {
          ...newPlant,
        };

        setPlantsMetadata(newContent);
      } else {
        await fetch(`http://localhost:8080/api/v1/plants/${newPlant.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPlant),
        });

        getPlants();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function deletePlant(id: number) {
    try {
      if (enableMockData && plantsMetadata) {
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
      } else {
        await fetch(`http://localhost:8080/api/v1/plants/${id}`, {
          method: "DELETE",
        });
        getPlants();
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
