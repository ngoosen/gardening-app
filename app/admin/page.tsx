import Header from "../components/ui/Header";
import PlantList from "./components/PlantList";

export default async function Home() {
  return (
    <>
      <Header />
      <section>
        <PlantList />
      </section>
    </>
  );
}
