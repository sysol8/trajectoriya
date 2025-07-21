import styles from "./CardList.module.css";
import Card from "../Card/Card.tsx";
import type { ICar } from "../../utils/types.ts";
import type { ReactElement } from "react";
import { useState } from "react";

interface CardListProps {
  data: ICar[];
  hoveredId: string | null;
}

function CardList({ data, hoveredId }: CardListProps): ReactElement {
  const [cards, setCards] = useState<ICar[]>(data);

  // карточки удаляются только на клиенте и появляются при обновлении страницы, т. к. в задании нет других API-эндпоинтов, кроме GET.
  // то же актуально и для редактирования карточек
  const handleCardDelete = (id: string) => {
    setCards((prev) => prev.filter((card) => card.id !== id));
  };

  return (
    <div className={`${styles.cards}`}>
      {cards.map((card: ICar): ReactElement => {
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
            onDelete={() => handleCardDelete(card.id)}
            isHovered={hoveredId === card.id}
          />
        );
      })}
    </div>
  );
}

export default CardList;
