import styles from "./Card.module.css";
import type { ICar } from "../../utils/types.ts";
// @ts-ignore
import DeleteIcon from "../../assets/icons/delete.svg?react";
// @ts-ignore
import EditIcon from "../../assets/icons/edit.svg?react";
/*import type { ChangeEvent, FormEvent, FormEventHandler } from "react";*/

interface ICardProps extends ICar {
  onEdit: () => void;
  onDelete: () => void;
  isHovered: boolean;
}

type editable = boolean;

function Card({
  id,
  name,
  model,
  year,
  color,
  price,
  latitude,
  longitude,
  onEdit,
  onDelete,
  isHovered,
}: ICardProps) {
  return (
    <article
      className={`${styles.card} ${isHovered ? styles.cardHovered : ""}`}
      id={id}
    >
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
      <div className={styles.colorContainer}>
        <span>Цвет</span>
        <span
          className={styles.color}
          style={{ backgroundColor: color }}
        ></span>
      </div>
      <div className={styles.buttons}>
        <button className={styles.button} onClick={onEdit}>
          <EditIcon className={styles.icon} />
        </button>
        <button className={styles.button} onClick={onDelete}>
          <DeleteIcon className={styles.icon} />
        </button>
      </div>
    </article>
  );
}

export default Card;
