import styles from "./CardList.module.css";
import Card from "../Card/Card.tsx";
import type { ICar, TCoordinates } from "../../utils/types.ts";
import CarMap from "../Map/Map.tsx";
import type { ReactElement } from "react";
import { useState, useMemo } from "react";
import Popup from "../Popup/Popup.tsx";

interface CardListProps {
  data: ICar[];
  hoveredId: string | null;
}

function CardList({ data, hoveredId }: CardListProps): ReactElement {
  const [cards, setCards] = useState<ICar[]>(data);
  const [cardIsEditing, setCardIsEditing] = useState<ICar | null>(null);

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
            onEdit={() => setCardIsEditing(card)}
            isHovered={hoveredId === card.id}
          />
        );
      })}
      {cardIsEditing && (
        <Popup
          isOpen={true}
          fields={[
            { label: "name", title: "Название" },
            { label: "price", title: "Цена" },
          ]}
          onClose={() => setCardIsEditing(null)}
          onSubmit={(updatedValues) => {
            setCards((prev) =>
              prev.map((card) =>
                card.id === cardIsEditing.id
                  ? { ...card, ...updatedValues }
                  : card,
              ),
            );
            setCardIsEditing(null);
          }}
        />
      )}
    </div>
  );
}

export default CardList;
