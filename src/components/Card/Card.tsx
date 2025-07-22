import styles from "./Card.module.css";
import type { ICar, Field } from "../../utils/types.ts";
import { useState } from "react";
import Popup from "../Popup/Popup.tsx";
// @ts-ignore
import DeleteIcon from "../../assets/icons/delete.svg?react";
// @ts-ignore
import EditIcon from "../../assets/icons/edit.svg?react";

interface ICardProps extends ICar {
  onEdit?: () => void;
  onDelete: () => void;
  isHovered: boolean;
}

function Card({
  id,
  name: initialName,
  model,
  year,
  color,
  price: initialPrice,
  latitude,
  longitude,
  onDelete,
  isHovered,
}: ICardProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [name, setName] = useState(initialName);
  const [price, setPrice] = useState(initialPrice);

  const editableFields: Field[] = [
    {
      label: "name",
      title: "Название",
      value: name,
    },
    {
      label: "price",
      title: "Цена",
      value: price,
    },
  ];

  const handleSave = (values: Record<string, string>) => {
    setName(values.name);
    setPrice(Number(values.price));
    setIsEditing(false);
  };

  return (
    <>
      <article
        className={`${styles.card} ${isHovered ? styles.cardHovered : ""}`}
        id={id}
      >
        <div className={styles.text}>
          <h2 className={styles.heading}>
            {name} {model}
          </h2>
          <p className={styles.textContent}>Год выпуска: {year}</p>
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
          <button className={styles.button} onClick={() => setIsEditing(true)}>
            <EditIcon className={styles.icon} />
          </button>
          <button className={styles.button} onClick={onDelete}>
            <DeleteIcon className={styles.icon} />
          </button>
        </div>
      </article>
      {isEditing && (
        <Popup
          fields={editableFields}
          isOpen={isEditing}
          onClose={() => setIsEditing(!isEditing)}
          onSubmit={handleSave}
        ></Popup>
      )}
    </>
  );
}

export default Card;
