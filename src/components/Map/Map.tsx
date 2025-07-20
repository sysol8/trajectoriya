import { useEffect, memo, type NamedExoticComponent } from "react";
import type { Map as MapGL, Marker } from "@2gis/mapgl/global";
import { load } from "@2gis/mapgl";
import styles from "./Map.module.css";
import type { TCoordinates } from "../../utils/types";
import type { ReactElement } from "react";

interface CarMapProps {
  coordinates: TCoordinates;
}

function Map({ coordinates }: CarMapProps): ReactElement {
  useEffect(() => {
    let map: MapGL;
    let markers: Marker[] = [];

    load().then((mapglAPI) => {
      map = new mapglAPI.Map("map", {
        center: [30.31413, 59.93863],
        zoom: 9,
        key: import.meta.env.VITE_API_KEY,
      });

      markers = coordinates.map((coords): Marker => {
        return new mapglAPI.Marker(map, { coordinates: coords });
      });
    });

    return () => {
      if (map) {
        markers.forEach((marker) => marker.destroy?.());
        map.destroy();
      }
    };
  }, []);

  return (
    <div className={`${styles.container}`}>
      <MapWrapper />
    </div>
  );
}

const MapWrapper: NamedExoticComponent = memo(
  (): ReactElement => {
    return (
      <>
        <div id="map" className={`${styles.map}`}></div>
      </>
    );
  },
  () => true,
);

export default Map;
