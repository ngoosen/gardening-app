import { ChevronDown, ChevronUp } from "lucide-react";

import styles from "@/style/admin/PlantListFilterItem.module.scss";

import { ORDER } from "./PlantListFilter";

interface IPlantListFilterItemProps {
  order: ORDER
  title: string
}

export default function PlantListFilterItem(props: IPlantListFilterItemProps): JSX.Element {
  const {
    order,
    title,
  } = props;

  return (
    <li className={styles.main}>
      <button>
        <p>{title}</p>
        {order === ORDER.DESC && <ChevronDown />}
        {order === ORDER.ASC && <ChevronUp />}
      </button>
    </li>
  );
}
