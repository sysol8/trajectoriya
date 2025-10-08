import styles from "./Header.module.css";
// @ts-ignore
import AddIcon from "../../assets/icons/add.svg?react";
import { useBoundStore } from "../../store/store.ts";
import { CreateCarForm } from "../Form/Form.tsx";
import Sorter from "../Sorter/Sorter.tsx";

interface HeaderProps {
  title: string;
}

function Header({ title }: HeaderProps) {
  const openModal = useBoundStore((state) => state.openModal);

  const handleCardAdd = () => {
    openModal(<CreateCarForm />);
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.controls}>
        <Sorter />
        <button className={styles.add} onClick={handleCardAdd}>
          <AddIcon className={styles.addIcon} />
        </button>
      </div>
    </header>
  );
}

export default Header;
