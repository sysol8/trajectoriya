import styles from "./CarsLayout.module.css";
import { useEffect, useState, useCallback } from "react";
import Navbar from "../components/Navbar/Navbar.tsx";
import CardList from "../components/CardList/CardList.tsx";
import Header from "../components/Header/Header.tsx";
import { useBoundStore } from "../store/store.ts";
import CarMap from "../components/Map/Map.tsx";

function CarsLayout() {
  const getCars = useBoundStore((state) => state.getCars);
  const loading = useBoundStore((state) => state.loading);
  const error = useBoundStore((state) => state.error);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleMenuItemHover = useCallback((id: string) => {
    setHoveredId(id);
  }, []);

  const handleMenuItemLeave = useCallback(() => {
    setHoveredId(null);
  }, []);

  useEffect(() => {
    getCars();
  }, []);

  if (loading) return <Fallback error={null} loading={loading} />;

  if (error) return <Fallback error={error} loading={loading} />;

  return (
    <div className={styles.layout}>
      <Navbar
        onHover={handleMenuItemHover}
        onLeave={handleMenuItemLeave}
      ></Navbar>
      <div className={styles.content}>
        <Header title={"Автомобили"} />
        <main className={`${styles.main} custom-scrollbar`}>
          <section>
            <h2 className="visually-hidden">Список автомобилей</h2>
            <CardList hoveredId={hoveredId}></CardList>
          </section>
          <section>
            <h2 className={styles.subheading}>Автомобили на карте</h2>
            <CarMap />
          </section>
        </main>
      </div>
    </div>
  );
}

interface FallbackProps {
  error: string | null;
  loading: boolean;
}

function Fallback({ error, loading }: FallbackProps) {
  if (error)
    return (
      <div className={styles.layout}>
        <p className={styles.fallback}>{error}</p>
      </div>
    );

  if (loading)
    return (
      <div className={styles.layout}>
        <p className={styles.fallback}>Загрузка</p>
      </div>
    );

  return null;
}

export default CarsLayout;
