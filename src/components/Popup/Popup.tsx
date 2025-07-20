import styles from "./Popup.module.css";
import { useState } from "react";
import type { FormEvent } from "react";

interface Field {
  label: string;
  title: string;
}

interface PopupProps {
  fields: Field[];
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: Record<string, string>) => void;
}

function Popup({ fields, isOpen, onClose, onSubmit }: PopupProps) {
  const [formValues, setFormValues] = useState<Record<string, string>>({});

  const handleChange = (label: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [label]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formValues);
    onClose();
  };

  return (
    <div className={`${styles.backdrop} ${isOpen ? styles.popupOpen : ""}`}>
      <form className={`${styles.popup}`} onSubmit={handleSubmit}>
        <h3>Редактировать</h3>
        <button
          className={styles.close}
          onClick={(e) => {
            e.preventDefault();
            onClose();
          }}
        >
          x
        </button>
        {fields.map(({ label, title }) => (
          <label key={label}>
            {title}
            <input
              className={styles.input}
              value={formValues[label] ?? ""}
              onChange={(e) => handleChange(label, e.target.value)}
            />
          </label>
        ))}
        <button className={styles.submit} type="submit">
          Сохранить
        </button>
      </form>
    </div>
  );
}

export default Popup;
