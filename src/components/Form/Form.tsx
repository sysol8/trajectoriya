import { useBoundStore } from "../../store/store.ts";
import styles from "./Form.module.css";
import { type ChangeEvent, type FormEvent, useMemo, useState } from "react";
import type { ICar } from "../../utils/types.ts";

const COLOR_OPTIONS = {
  red: "Красный",
  black: "Черный",
  white: "Белый",
  blue: "Синий",
  silver: "Серебристый",
} as const;

function CreateCarForm() {
  const colorOptions = useMemo(() => Object.entries(COLOR_OPTIONS), []);

  const closeModal = useBoundStore((state) => state.closeModal);

  const [formValues, setFormValues] = useState({
    name: "",
    model: "",
    year: "",
    color: "",
    price: "",
  });

  const createCar = useBoundStore((state) => state.createCar);

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    createCar({
      ...formValues,
      price: formValues.price ? formValues.price : "0",
    });
    closeModal();
  };

  const isValid =
    formValues.name.trim() !== "" &&
    formValues.model.trim() !== "" &&
    formValues.year.trim() !== "" &&
    formValues.color.trim() !== "";

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form className={styles.form} onSubmit={handleFormSubmit}>
      <h2 className={styles.heading}>Добавить карточку</h2>
      <fieldset className={styles.fields}>
        <label className={styles.label} htmlFor="name-input">
          Марка
          <input
            name="name"
            className={styles.input}
            id="name-input"
            placeholder="Toyota"
            value={formValues.name}
            onChange={handleInputChange}
            required
          />
        </label>
        <label className={styles.label} htmlFor="model-input">
          Модель
          <input
            name="model"
            className={styles.input}
            id="model-input"
            placeholder="Camry"
            value={formValues.model}
            onChange={handleInputChange}
            required
          />
        </label>
        <label className={styles.label} htmlFor="year-input">
          Год выпуска
          <input
            className={styles.input}
            name="year"
            id="year-input"
            type="number"
            placeholder={new Date().getFullYear().toString()}
            min={1886}
            max={new Date().getFullYear()}
            value={formValues.year}
            onChange={handleInputChange}
            required
          />
        </label>
        <label className={styles.label} htmlFor="color-input">
          Цвет
          <select
            className={styles.select}
            value={formValues.color}
            onChange={handleInputChange}
            name="color"
            required
          >
            <option className={styles.option} value="" disabled>
              Выберите цвет
            </option>
            {colorOptions.map(([key, value]) => (
              <option className={styles.option} key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.label} htmlFor="price-input">
          Цена
          <input
            id="price-input"
            placeholder="0"
            type="number"
            name="price"
            value={formValues.price}
            className={styles.input}
            onChange={handleInputChange}
          />
        </label>
      </fieldset>
      <button type={"submit"} className={styles.submit} disabled={!isValid}>
        Добавить
      </button>
    </form>
  );
}

interface EditCarFormProps {
  id: string;
  initialData: Pick<ICar, "name" | "price">;
}

function EditCarForm({ id, initialData }: EditCarFormProps) {
  const closeModal = useBoundStore((state) => state.closeModal);
  const updateCar = useBoundStore((state) => state.updateCar);

  const [formValues, setFormValues] = useState({
    name: "",
    price: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateCar(id, formValues);
    closeModal();
  };

  // простая валидация, проверяет заполненность полей
  const isValid =
    formValues.name.trim().length > 0 &&
    formValues.price.toString().trim().length > 0;

  return (
    <form className={styles.form} onSubmit={handleFormSubmit}>
      <h2 className={styles.heading}>Редактировать карточку</h2>
      <fieldset className={styles.fields}>
        <label className={styles.label} htmlFor="name-input">
          Марка
          <input
            id="name-input"
            placeholder={initialData.name}
            type="text"
            name="name"
            value={formValues.name}
            className={styles.input}
            onChange={handleInputChange}
            required
          />
        </label>
        <label className={styles.label} htmlFor="price-input">
          Цена
          <input
            id="price-input"
            placeholder={initialData.price.toString()}
            type="number"
            name="price"
            value={formValues.price}
            className={styles.input}
            onChange={handleInputChange}
          />
        </label>
      </fieldset>
      <button type={"submit"} className={styles.submit} disabled={!isValid}>
        Сохранить
      </button>
    </form>
  );
}

export { EditCarForm, CreateCarForm };
