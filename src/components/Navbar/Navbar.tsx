import styles from "./Navbar.module.css";
import { useBoundStore } from "../../store/store.ts";

interface NavbarProps {
  onHover: (id: string) => void;
  onLeave: () => void;
}

function Navbar({ onHover, onLeave }: NavbarProps) {
  // здесь храним просто cars, смысла сортировать особо нет
  const cars = useBoundStore(state => state.cars);

  return (
    <nav className={`${styles.nav} custom-scrollbar`}>
      <ul className={styles.list}>
        {cars.map((car) => {
          return (
            <li
              key={car.id}
              className={styles.item}
              onMouseEnter={() => onHover(car.id)}
              onMouseLeave={onLeave}
            >
              <a href={`#car-${car.id}`} className={styles.link}>
                {car.name} {car.model}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Navbar;
