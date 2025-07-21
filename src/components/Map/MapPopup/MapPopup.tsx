import styles from "./MapPopup.module.css";

interface MapPopupProps {
  onOpen: () => void;
  onClose: () => void;
  textContent: string;
}

function MapPopup({ onOpen, onClose, textContent }: MapPopupProps) {
  const closePopup = () => {
    if (onClose) onClose();
  };

  return (
    <div className={styles.popup}>
      <div className={styles.content}>
        <button className={styles.button} onClick={closePopup}>
          x
        </button>
        <p className={styles.text}>{textContent}</p>
      </div>
    </div>
  );
}

export default MapPopup;
