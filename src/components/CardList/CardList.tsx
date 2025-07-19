import styles from "./CardList.module.css";
import Card from "../Card/Card.tsx";
import type { ICar, TCoordinates } from "../../utils/types.ts";
import CarMap from "../CarMap/CarMap.tsx";

interface CardListProps {
  data: ICar[];
}

function CardList({ data }: CardListProps) {
  const coordinates: TCoordinates = data.map((car) => [
    car.longitude,
    car.latitude,
  ]);

  return (
    <main className={`${styles.content} custom-scrollbar`}>
      {data.map((card) => {
        return (
          <Card
            key={card.id}
            id={card.id}
            name={card.name}
            model={card.model}
            year={card.year}
            color={card.color}
            price={card.price}
            longitude={card.longitude}
            latitude={card.latitude}
          />
        );
      })}
      <CarMap coordinates={coordinates}></CarMap>
    </main>
  );
}

export default CardList;
