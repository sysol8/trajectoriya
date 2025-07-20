import styles from "./CarsLayout.module.css";
import useCars from "../hooks/useCars.ts";
import Navbar from "../components/Navbar/Navbar.tsx";
import CardList from "../components/CardList/CardList.tsx";
import CarMap from "../components/Map/Map.tsx";
import { useState } from "react";

function CarsLayout() {
  const { cars, loading, error } = useCars();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка</p>;

  const markers = cars.map((car: ICar) => [car.longitude, car.latitude]);

  return (
    <div className={styles.layout}>
      <Navbar
        data={cars}
        onHover={setHoveredId}
        onLeave={() => setHoveredId(null)}
      ></Navbar>
      <main className={`${styles.main} custom-scrollbar`}>
        <h1>Автомобили</h1>
        <section>
          <h2 className="visually-hidden">Список автомобилей</h2>
          <CardList data={cars} hoveredId={hoveredId}></CardList>
        </section>
        <section>
          <h2 className={styles.subheading}>Автомобили на карте</h2>
          <CarMap coordinates={markers}></CarMap>
        </section>
      </main>
    </div>
  );
}

export default CarsLayout;
