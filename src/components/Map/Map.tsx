import styles from "./Map.module.css";
import type { Map as MapGL, Marker as MarkerGL } from "@2gis/mapgl/global";
import type { MapMarker } from "../../utils/types";
import type { ReactElement, NamedExoticComponent } from "react";
import { load } from "@2gis/mapgl";
import { useEffect, memo } from "react";

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
        const mark = new mapglAPI.Marker(map, {
          coordinates: marker.coordinates,
        });

        let isLabelVisible = false;

        mark.on("click", () => {
          if (isLabelVisible) {
            mark.setLabel({ text: "" });
          } else {
            mark.setLabel({
              text: marker.textContent,
            });
          }
          isLabelVisible = !isLabelVisible;
        });

        return mark;
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
