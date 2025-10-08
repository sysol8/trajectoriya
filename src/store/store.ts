import { create } from "zustand";
import { type CarsSlice, createCarsSlice } from "./cars.slice.ts";
import { type ModalSlice, createModalSlice } from "./modal.slice.ts";

export const useBoundStore = create<CarsSlice & ModalSlice>((...a) => ({
  ...createCarsSlice(...a),
  ...createModalSlice(...a),
}));
