import { useEffect, useState } from "react";

import styles from "@/style/admin/PlantListFilter.module.scss";

import { ORDER } from "@/hooks/usePlants";

import PlantListFilterItem from "./PlantListFilterItem";

interface IPlantListFilterProps {
  onSort: CallableFunction
}

interface ISorting {
  sortBy: string,
  order: ORDER
}

export default function PlantListFilter(props: IPlantListFilterProps): JSX.Element {
  const { onSort, } = props;
  const [sorting, setSorting] = useState<ISorting>({ sortBy: "name", order: ORDER.DESC});

  useEffect(() => {
    const value = window.localStorage.getItem("plant_list_sorting");

    if (value) {
      setSorting({ sortBy: value.split("-")[0], order: value.split("-")[1] as ORDER});
    }
  }, []);

  useEffect(() => {
    onSort(sorting.sortBy, sorting.order);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorting]);

  function nameClickHandler(newOrder: ORDER) {
    setSorting({
      sortBy: "name",
      order: newOrder,
    });
  }

  function dateClickHandler(newOrder: ORDER) {
    setSorting({
      sortBy: "update",
      order: newOrder,
    });
  }

  return (
    <ul className={styles.main}>
      <PlantListFilterItem
        order={sorting.sortBy === "name" && sorting.order === ORDER.ASC ? ORDER.ASC : ORDER.DESC}
        title="Name"
        onClick={nameClickHandler}
      />
      <PlantListFilterItem
        order={sorting.sortBy === "update" && sorting.order === ORDER.ASC ? ORDER.ASC : ORDER.DESC}
        title="Last update"
        onClick={dateClickHandler}
      />
    </ul>
  );
}
