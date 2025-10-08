import styles from "./Card.module.css";
import type { ICar } from "../../utils/types.ts";
// @ts-ignore
import DeleteIcon from "../../assets/icons/delete.svg?react";
// @ts-ignore
import EditIcon from "../../assets/icons/edit.svg?react";
import { useBoundStore } from "../../store/store.ts";
import { EditCarForm } from "../Form/Form.tsx";
import { memo, useCallback } from "react";

interface ICardProps extends ICar {
  onEdit?: () => void;
  isHovered: boolean;
}

function Card({
  id,
  name,
  model,
  year,
  color,
  price,
  latitude,
  longitude,
  isHovered,
}: ICardProps) {
  const removeCar = useBoundStore((state) => state.removeCar);
  const openModal = useBoundStore((state) => state.openModal);

  const handleCardRemove = useCallback(() => {
    removeCar(id);
  }, [])

  const handleCardEdit = useCallback(() => {
    const initialData = { name, price };
    openModal(<EditCarForm id={id} initialData={initialData} />);
  }, [])

  return (
    <>
      <article
        className={`${styles.card} ${isHovered ? styles.cardHovered : ""}`}
        id={`car-${id}`}
      >
        <div className={styles.text}>
          <h2 className={styles.heading}>
            {name} {model}
          </h2>
          <p className={styles.textContent}>Год выпуска: {year}</p>
          <p className={styles.textContent}>
            {/* Если цена не указана, "отдаем бесплатно" */}
            {price !== "0" ? `Цена: ${price}` : "Бесплатно"}
          </p>
          <p className={styles.textContent}>
            {/* Если нет координат, отмечаем это. Также для карточек без координат на карте не ставится маркер.
            В данном кейсе в качестве альтернативы можно генерировать рандомные координаты при создании карточки */}
            {longitude === 0 && latitude === 0
              ? "Местоположение неизвестно"
              : `Координаты: ${longitude}, ${latitude}`}
          </p>
        </div>
        <div className={styles.colorContainer}>
          <span>Цвет</span>
          <span
            className={styles.color}
            style={{ backgroundColor: color }}
          ></span>
        </div>
        <div className={styles.buttons}>
          <button className={styles.button} onClick={handleCardEdit}>
            <EditIcon className={styles.icon} />
          </button>
          <button className={styles.button} onClick={handleCardRemove}>
            <DeleteIcon className={styles.icon} />
          </button>
        </div>
      </article>
    </>
  );
}

const memoizedCard = memo(Card);

export default memoizedCard;
