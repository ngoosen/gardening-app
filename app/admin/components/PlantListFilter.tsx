import styles from "@/style/admin/PlantListFilter.module.scss";
import PlantListFilterItem from "./PlantListFilterItem";

export enum ORDER {
  ASC = "asc",
  DESC = "desc"
}

export default function PlantListFilter(): JSX.Element {
  return (
    <ul className={styles.main}>
      <PlantListFilterItem
        order={ORDER.DESC}
        title="Name"
        />
      <PlantListFilterItem
        order={ORDER.DESC}
        title="Last update"
      />
    </ul>
  );
}
