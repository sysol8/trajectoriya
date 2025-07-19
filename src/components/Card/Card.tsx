import styles from "./Card.module.css";
import type { ICar } from "../../utils/types.ts";
import type { ChangeEvent, FormEvent, FormEventHandler } from "react";

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
  const onDelete = () => {}
  const onEdit = () => {}

  return (
    <article className={styles.card} id={id}>
      <div className={styles.text}>
        <h2 className={styles.heading}>
          {name} {model}
        </h2>
        <p className={styles.textContent}>Год выпуска: {year.toString()}</p>
        <p className={styles.textContent}>Цена: {price}</p>
        <p className={styles.textContent}>
          Координаты: {longitude}, {latitude}
        </p>
      </div>
      <div>
        <span>Цвет</span>
        <span
          className={styles.color}
          style={{ backgroundColor: color }}
        ></span>
      </div>
      <div className={styles.buttons}>
        <button className={styles.button} onClick={onEdit}></button>
        <button className={styles.button} onClick={onDelete}></button>
      </div>
    </article>
  );
}

export default Card;
