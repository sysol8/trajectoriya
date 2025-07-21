import styles from "./Popup.module.css";
import type { FormEvent, ChangeEvent } from "react";
import type { Field } from "../../utils/types.ts";
import { useState, useEffect } from "react";

interface PopupProps {
  fields: Field[];
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: Record<string, string>) => void;
}

function Popup({ fields, isOpen, onClose, onSubmit }: PopupProps) {
  const [formValues, setFormValues] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!isOpen) return;
    const initialValues: Record<string, string> = {};
    for (const { label, value } of fields) {
      initialValues[label] = String(value);
    }
    setFormValues(initialValues);
  }, [fields, isOpen]);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formValues);
    onClose();
  };

  const handleInputChange = (label: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [label]: value }));
  };

  const handleCloseByEsc = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  const handleCloseByOverlayClick = (e: MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains(styles.backdrop)) {
      onClose();
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    document.addEventListener("keydown", handleCloseByEsc);
    document.addEventListener("click", handleCloseByOverlayClick);

    return () => {
      document.removeEventListener("keydown", handleCloseByEsc);
      document.removeEventListener("click", handleCloseByOverlayClick);
    };
  }, [isOpen]);

  return (
    <div className={`${styles.backdrop} ${isOpen ? styles.popupOpen : ""}`}>
      <form className={`${styles.popup}`} onSubmit={handleFormSubmit}>
        <h3 className={styles.heading}>Редактировать</h3>
        <button className={styles.close} type="button" onClick={onClose}>
          x
        </button>
        <fieldset className={styles.fieldset}>
          {fields.map(({ label, title }) => (
            <label key={label} className={styles.label}>
              {title}
              <input
                className={styles.input}
                value={formValues[label] ?? ""}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(label, e.target.value)
                }
              />
            </label>
          ))}
        </fieldset>
        <button className={styles.submit} type="submit">
          Сохранить
        </button>
      </form>
    </div>
  );
}

export default Popup;
