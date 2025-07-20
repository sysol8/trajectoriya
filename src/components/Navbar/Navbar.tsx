import type { ICar } from "../../utils/types.ts";
import styles from "./Navbar.module.css";

interface NavbarProps {
  data: ICar[];
  onHover: (id: string) => void;
  onLeave: () => void;
}

function Navbar({ data, onHover, onLeave }: NavbarProps) {
  return (
    <nav className={`${styles.nav} custom-scrollbar`}>
      <ul className={styles.list}>
        {data.map((item) => {
          return (
            <li
              key={item.id}
              className={styles.item}
              onMouseEnter={() => onHover(item.id)}
              onMouseLeave={onLeave}
            >
              <a href={`#${item.id}`} className={styles.link}>
                {item.name} {item.model}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Navbar;
