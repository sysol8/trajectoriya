import styles from "./Modal.module.css";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useBoundStore } from "../../store/store.ts";

function Modal() {
  const isModalOpen = useBoundStore((state) => state.isModalOpen);
  const closeModal = useBoundStore((state) => state.closeModal);
  const modalContent = useBoundStore((state) => state.modalContent);
  const modalRef = useRef(null);

  const modalRoot = document.getElementById("modal-root");

  const handleCloseByEsc = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      closeModal();
    }
  };

  const handleCloseByOverlayClick = (e: MouseEvent) => {
    if (e.target === modalRef.current) {
      closeModal();
    }
  };

  useEffect(() => {
    if (!isModalOpen) return;

    document.addEventListener("keydown", handleCloseByEsc);
    document.addEventListener("click", handleCloseByOverlayClick);

    return () => {
      document.removeEventListener("keydown", handleCloseByEsc);
      document.removeEventListener("click", handleCloseByOverlayClick);
    };
  }, [isModalOpen]);

  if (!modalRoot || !isModalOpen) return null;

  return createPortal(
    <div ref={modalRef} className={`${styles.backdrop}`}>
      <div className={styles.content}>
        <button className={styles.close} type="button" onClick={closeModal}>
          x
        </button>
        {modalContent}
      </div>
    </div>,
    modalRoot,
  );
}

export default Modal;
