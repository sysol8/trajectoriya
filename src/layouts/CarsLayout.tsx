import styles from "./CarsLayout.module.css";
import type { MapMarker } from "../utils/types.ts";
import { useState } from "react";
import useCars from "../hooks/useCars.ts";
import Navbar from "../components/Navbar/Navbar.tsx";
import CardList from "../components/CardList/CardList.tsx";
import CarMap from "../components/Map/Map.tsx";

function CarsLayout() {
  const { cars, loading, error } = useCars();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const carMarkers: MapMarker[] = cars.map((car) => ({
    textContent: `${car.name} ${car.model}`,
    coordinates: [car.longitude, car.latitude],
  }));

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка</p>;

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
          <CarMap markers={carMarkers}></CarMap>
        </section>
      </main>
    </div>
  );
}

export default CarsLayout;
