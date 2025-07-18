import styles from "./Card.module.css";
import type { ICar } from "../../utils/types.ts";

interface ICardProps extends ICar {
  onEdit?: () => void;
  onDelete?: () => void;
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
}: ICardProps) {
  return (
    <article className={styles.card} id={id}>
      <div className={styles.text}>
        <h2 className={styles.heading}>
          {name} {model}
        </h2>
        <p className={styles.textContent}>Год выпуска: {year.toString()}</p>
          <p className={styles.textContent}>Цена: {price}</p>
          <p className={styles.textContent}>Координаты: {longitude}, {latitude}</p>
      </div>
      <span className={styles.color} style={{ backgroundColor: color }}>
        Цвет
      </span>
    </article>
  );
}

export default Card;
