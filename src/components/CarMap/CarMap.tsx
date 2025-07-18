import { useEffect, useState, useRef } from "react";
import styles from "./CarMap.module.css";
import type { ICar } from "../../utils/types";

interface CarMapProps {
  data: ICar[];
}

declare global {
  interface Window {
    ymaps: any;
  }
}

function CarMap({ data }: CarMapProps) {
  const [open, setOpen] = useState<boolean>(false);
  const scriptApiKey: string = import.meta.env.API_KEY
  const mapRef = useRef<any>(null);

  useEffect(() => {
    const loadYandexMap = () => {
      return new Promise<void>((resolve, reject) => {
        if (window.ymaps) {
          resolve();
          return;
        }

        const script = document.createElement("script");
        script.src = `https://api-maps.yandex.ru/2.1/?apikey=${scriptApiKey}&lang=ru_RU`;
        script.type = "text/javascript";
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Ошибка при загрузке карты"));
        document.head.appendChild(script);
      });
    };

    loadYandexMap().then(() => {
      window.ymaps.ready(() => {
        const map = new window.ymaps.Map("map", {
          center: [55.76, 37.64],
          zoom: 10,
        });

        data.forEach((car) => {
          const placemark = new window.ymaps.Placemark(
            [car.latitude, car.longitude],
            {
              balloonContent: `${car.name} ${car.model}`,
            },
          );
          map.geoObjects.add(placemark);
        });
        mapRef.current = map;
      });
    });
  }, [data]);

  useEffect(() => {
    if (!open || !mapRef.current) return;

    const timeout = setTimeout(() => {
      mapRef.current.container.fitToViewport();
    }, 100);

    return () => clearTimeout(timeout);
  }, [open]);


  return (
    <div className={styles.container}>
      <div className={styles.hidden}>
        <button className={styles.button} onClick={() => setOpen(!open)}>
          ^
        </button>
      </div>
      <div
        id="map"
        className={`${styles.map} ${open ? styles.open : ""}`}
      ></div>
    </div>
  );
}

export default CarMap;
