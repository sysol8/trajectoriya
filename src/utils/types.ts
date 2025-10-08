export type Longitude = number;
export type Latitude = number;

export type TCoordinates = [Longitude, Latitude];

export interface ICar {
  id: string;
  name: string;
  model: string;
  year: string;
  color: string;
  price: string;
  latitude: Latitude;
  longitude: Longitude;
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
