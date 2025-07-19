import { useEffect, useState, memo } from "react";
import { Map, Marker } from "@2gis/mapgl/global";
import { load } from "@2gis/mapgl";
import styles from "./CarMap.module.css";
import type { TCoordinates } from "../../utils/types";
import type { ReactElement } from "react";

interface CarMapProps {
  coordinates: TCoordinates;
}

function CarMap({ coordinates }: CarMapProps): ReactElement {
  useEffect(() => {
    let map: Map;
    let markers: Marker[] = [];

    load().then((mapglAPI) => {
      map = new mapglAPI.Map("map", {
        center: [59.938848, 30.314798],
        zoom: 9,
        key: import.meta.env.API_KEY,
      });

      markers = coordinates.map((coords) => {
        return new mapglAPI.Marker(map, { coordinates: coords });
      });
    });

    return () => {
      if (map) {
        markers.forEach((marker) => marker.destroy?.());
        map.destroy();
      }
    };
  }, [coordinates]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <MapWrapper />
    </div>
  );
}

const MapWrapper = memo(function MapWrapper() {
  const [open, setOpen] = useState<boolean>(true);

  return (
    <div className={`${styles.container}`}>
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
});

export default CarMap;
