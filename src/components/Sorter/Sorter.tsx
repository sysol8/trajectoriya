import styles from "../Sorter/Sorter.module.css";
import { useBoundStore } from "../../store/store.ts";
import type { ChangeEvent } from "react";

function Sorter() {
  const sortField = useBoundStore((state) => state.sortField);
  const sortOrder = useBoundStore((state) => state.sortOrder);
  const setSort = useBoundStore((state) => state.setSort);

  const onFieldChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as "" | "year" | "price";
    setSort(value === "" ? null : (value as "year" | "price"), sortOrder);
  };

  const onOrderChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const order = e.target.value as "asc" | "desc";
    setSort(sortField, order);
  };

  return (
    <div className={styles.sort}>
      <label>
        Сортировать по:&nbsp;
        <select className={styles.select} value={sortField ?? ""} onChange={onFieldChange}>
          <option className={styles.option} value="">
            —
          </option>
          <option className={styles.option} value="year">
            Год
          </option>
          <option className={styles.option} value="price">
            Цена
          </option>
        </select>
      </label>
      <label>
        Порядок:&nbsp;
        <select className={styles.select} value={sortOrder} disabled={!sortField} onChange={onOrderChange}>
          <option className={styles.option} value="asc">
            По возрастанию
          </option>
          <option className={styles.option} value="desc">
            По убыванию
          </option>
        </select>
      </label>
    </div>
  );
}

export default Sorter;
