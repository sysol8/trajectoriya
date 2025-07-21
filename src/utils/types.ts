export interface ICar {
    id: string
    name: string
    model: string
    year: number
    color: string
    price: number
    latitude: number
    longitude: number
}

export interface MapMarker {
  textContent: string;
  coordinates: TCoordinates;
}

export interface Field {
  label: string;
  title: string;
  value: string | number;
  editable?: boolean;
}

export type TCoordinates = [number, number];
