import { UserCog } from "lucide-react";

import styles from "@/style/admin/page.module.scss";

import Header from "../components/ui/Header";
import PlantList from "./components/PlantList";

export default async function Home() {
  return (
    <>
      <Header />
      <section className={styles.plant_list}>
        <h1><UserCog /> Administration</h1>
        <PlantList />
      </section>
    </>
  );
}
