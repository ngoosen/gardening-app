// import styles from "@/app/page.module.scss";

import PlantList from "./components/PlantList";

export default async function Home() {
  const data = await fetch("http://localhost:8080/api/v1/plants");
  const parsing = await data.json();

  return (
    <PlantList plants={parsing.content} />
  );
}
