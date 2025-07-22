// CardList.tsx
import styles from "./CardList.module.css";
import type { ICar } from "../../utils/types.ts";
import type { ReactElement } from "react";
import { useState, useMemo } from "react";
import Card from "../Card/Card.tsx";

type SortKey = "year" | "price" | "";
type SortOrder = "asc" | "desc";

interface CardListProps {
  data: ICar[];
  hoveredId: string | null;
}

function CardList({ data, hoveredId }: CardListProps): ReactElement {
  const [cards, setCards] = useState<ICar[]>(data);
  const [sortKey, setSortKey] = useState<SortKey>("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const handleCardDelete = (id: string) => {
    setCards((prev) => prev.filter((card) => card.id !== id));
  };

  const sortedCards = useMemo(() => {
    if (!sortKey) return cards;
    return [...cards].sort((a, b) => {
      const diff = a[sortKey] - b[sortKey];
      return sortOrder === "asc" ? diff : -diff;
    });
  }, [cards, sortKey, sortOrder]);

  return (
    <>
      <div className={styles.sortControls}>
        <label>
          Сортировать по:&nbsp;
          <select className={styles.select}
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
          >
            <option className={styles.option} value="">—</option>
            <option className={styles.option} value="year">Год</option>
            <option className={styles.option} value="price">Цена</option>
          </select>
        </label>

        <label>
          Порядок:&nbsp;
          <select className={styles.select}
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as SortOrder)}
            disabled={!sortKey}
          >
            <option className={styles.option} value="asc">По возрастанию</option>
            <option className={styles.option} value="desc">По убыванию</option>
          </select>
        </label>
      </div>

      <div className={styles.cards}>
        {sortedCards.map(
          (card: ICar): ReactElement => (
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
          ),
        )}
      </div>
    </>
  );
}

export default CardList;
