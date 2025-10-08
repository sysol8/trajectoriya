import styles from "./Map.module.css";
import type { Map as MapGL, Marker as MarkerGL } from "@2gis/mapgl/global";
import {
  memo,
  type NamedExoticComponent,
  type ReactElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { load } from "@2gis/mapgl";
import { useBoundStore } from "../../store/store.ts";

function Map() {
  const [ready, setReady] = useState(false);

  const cars = useBoundStore((state) => state.cars);

  const markersData = useMemo(
    () =>
      cars
        .filter((car) => !(car.latitude === 0 && car.longitude === 0))
        .map((car) => ({
          coordinates: [car.longitude, car.latitude],
          text: `${car.name} ${car.model}`,
        })),
    [cars],
  );

  const mapRef = useRef<MapGL | null>(null);
  const apiRef = useRef<any>(null);

  // инициализируем карту
  useEffect(() => {
    load().then((mapglAPI) => {
      setReady(true);
      apiRef.current = mapglAPI;

      mapRef.current = new mapglAPI.Map("map", {
        center: [30.31413, 59.93863],
        zoom: 9,
        key: import.meta.env.VITE_API_KEY,
      });
    });
    return () => {
      mapRef.current?.destroy();
      mapRef.current = null;
    };
  }, []);

  // инициализируем маркеры
  useEffect(() => {
    if (!ready) return;
    const api = apiRef.current;
    const map = mapRef.current;
    if (!api || !map) return;

    const markers = markersData.map(({ coordinates, text }) => {
      const marker: MarkerGL = new api.Marker(map, { coordinates });

      let isLabelVisible = false;
      marker.on("click", () => {
        if (isLabelVisible) {
          marker.setLabel({ text: "" });
        } else {
          marker.setLabel({ text: text });
        }
        isLabelVisible = !isLabelVisible;
      });
      return marker;
    });
    return () => {
      markers.forEach((marker) => marker.destroy?.());
    };
  }, [ready, markersData]);

  return (
    <div className={styles.container}>
      <MapWrapper />
    </div>
  );
}

const MapWrapper: NamedExoticComponent = memo(
  (): ReactElement => {
    return (
      <>
        <div id="map" className={styles.map}></div>
      </>
    );
  },
  () => true,
);

export default Map;
