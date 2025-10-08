import styles from "./CardList.module.css";
import type { ICar } from "../../utils/types.ts";
import { type ReactElement, useMemo } from "react";
import Card from "../Card/Card.tsx";
import { useBoundStore } from "../../store/store.ts";

interface CardListProps {
  hoveredId: string | null;
}

function CardList({ hoveredId }: CardListProps): ReactElement {
  // Здесь сортируем карточки и мемоизируем результат. Эту логику можно вынести в кастомный хук, чтобы переиспользовать, например, в навигационной панели.
  // В данном случае сортировку оставляем только в списке карточек.
  const cars = useBoundStore((state) => state.cars);
  const sortField = useBoundStore((state) => state.sortField);
  const sortOrder = useBoundStore((state) => state.sortOrder);

  const sortedCars = useMemo(() => {
    if (!sortField) return cars;
    return [...cars].sort((a, b) => {
      const diff =
        (a[sortField] as unknown as number) -
        (b[sortField] as unknown as number);
      return sortOrder === 'asc' ? diff : -diff;
    });
  }, [cars, sortOrder, sortField]);

  return (
    <>
      <div className={styles.cards}>
        {sortedCars.map(
          (car: ICar): ReactElement => (
            <Card
              key={car.id}
              id={car.id}
              name={car.name}
              model={car.model}
              year={car.year}
              color={car.color}
              price={car.price}
              longitude={car.longitude}
              latitude={car.latitude}
              isHovered={hoveredId === car.id}
            />
          ),
        )}
      </div>
    </>
  );
}

export default CardList;
