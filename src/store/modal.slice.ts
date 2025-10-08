import { type StateCreator } from "zustand";
import type { ReactNode } from "react";

export interface ModalSlice {
  isModalOpen: boolean;
  modalContent: ReactNode | null;
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
}

export const createModalSlice: StateCreator<ModalSlice> = (set) => ({
  isModalOpen: false,
  modalContent: null,
  openModal: (content) => set({ isModalOpen: true, modalContent: content }),
  closeModal: () => set({ isModalOpen: false, modalContent: null }),
});
