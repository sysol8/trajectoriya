import { useEffect, memo, type NamedExoticComponent } from "react";
import type { Map as MapGL, Marker as MarkerGL } from "@2gis/mapgl/global";
import { load } from "@2gis/mapgl";
import styles from "./Map.module.css";
import type { MapMarker } from "../../utils/types";
import type { ReactElement } from "react";

interface MapProps {
  markers: MapMarker[];
}

function Map({ markers }: MapProps): ReactElement {
  useEffect(() => {
    let map: MapGL;
    let mrkrs: MarkerGL[] = [];

    load().then((mapglAPI) => {
      map = new mapglAPI.Map("map", {
        center: [30.31413, 59.93863],
        zoom: 9,
        key: import.meta.env.VITE_API_KEY,
      });

      mrkrs = markers.map((marker) => {
        return new mapglAPI.Marker(map, { coordinates: marker.coordinates });
      });
    });

    return () => {
      if (map) {
        mrkrs.forEach((marker) => marker.destroy?.());
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
