import { ChevronDown, ChevronUp } from "lucide-react";

import styles from "@/style/admin/PlantListFilterItem.module.scss";

import { ORDER } from "@/hooks/usePlants";

interface IPlantListFilterItemProps {
  order: ORDER
  title: string
  onClick: CallableFunction
}

export default function PlantListFilterItem(props: IPlantListFilterItemProps): JSX.Element {
  const {
    order,
    title,
    onClick,
  } = props;

  function clickHandler() {
    if (order === ORDER.ASC) {
      onClick(ORDER.DESC);
    } else {
      onClick(ORDER.ASC);
    }
  }

  return (
    <li className={styles.main}>
      <button onClick={clickHandler}>
        <p>{title}</p>
        {order === ORDER.DESC && <ChevronDown />}
        {order === ORDER.ASC && <ChevronUp />}
      </button>
    </li>
  );
}
