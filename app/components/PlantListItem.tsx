import { IPlant } from "@/hooks/usePlants";

interface IPlantListItemProps {
  plant: IPlant
  onClick: CallableFunction
}

export default function PlantListItem(props: IPlantListItemProps) {
  const { plant, onClick, } = props;

  function clickHandler() {
    onClick(plant.id);
  }

  return (
    <li onClick={clickHandler}>
      {plant.name}
    </li>
  );
}
