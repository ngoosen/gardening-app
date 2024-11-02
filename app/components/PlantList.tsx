export interface IPlant {
  id: number
  version: number
  name: string
  description: string
  createdAt: string
  updatedAt: string
}

export default async function PlantList() {
  const data = await fetch("http://localhost:8080/api/v1/plants");
  const parsing = await data.json();
  const plants: IPlant[] = parsing.content;
  console.log("🚀 ~ PlantList ~ plants:", plants);

  return (
    <ul>
      {plants.map((plant, index) => (
        <li key={index}>{plant.name}</li>
      ))}
    </ul>
  );
}
