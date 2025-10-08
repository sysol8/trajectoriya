import { type StateCreator } from "zustand";
import type { ICar, TCoordinates } from "../utils/types";
import { getCars as apiGetCars } from "../api/cars.ts";

type SortField = null | "year" | "price";
type SortOrder = "asc" | "desc";

export interface CarsSlice {
  cars: ICar[];
  sortField: SortField;
  sortOrder: SortOrder;

  // getCars: () => Promise<ICar[]>;
  getCars: () => void;
  createCar: (data: Omit<ICar, "id" | "latitude" | "longitude">) => ICar;
  updateCar: (id: string, patch: Partial<Pick<ICar, "name" | "price">>) => void;
  removeCar: (id: string) => void;
  setCoordinates: (id: string, coords: TCoordinates) => void;

  setSort: (field: SortField, order?: SortOrder) => void;
}

const genId = () =>
  Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

export const createCarsSlice: StateCreator<CarsSlice> = (set, get) => ({
  cars: [],
  sortField: null,
  sortOrder: "asc",

  // здесь напрямую перезаписываем массив, чтобы данные не дублировались в стрикт-моде дев режима.
  getCars: async () => {
    const result = await apiGetCars();
    // но лучше было бы обновить стейт иммутабельно
    // set((state) => ({ cars: [...state.cars, ...result] })
    set({ cars: result });
  },

  createCar: (data) => {
    const newCar: ICar = {
      id: genId(),
      latitude: 0,
      longitude: 0,
      ...data,
    };
    set((state) => ({ cars: [newCar, ...state.cars] }));
    return newCar;
  },

  updateCar: (id, patch) => {
    set((state) => ({
      cars: state.cars.map((car) =>
        car.id === id ? { ...car, ...patch } : car,
      ),
    }));
  },

  removeCar: (id: string) => {
    set((state) => ({
      cars: state.cars.filter((car) => car.id !== id),
    }));
  },

  // на всякий случай функция, чтобы вручную где-то проставить координаты для машины
  setCoordinates: (id, [latitude, longitude]) => {
    set((state) => ({
      cars: state.cars.map((car) =>
        car.id === id ? { ...car, latitude: latitude, longitude: longitude } : car,
      ),
    }));
  },

  setSort: (field, order) => {
    if (field === null) {
      set({ sortField: null });
      return;
    }
    const curr = get();
    const nextOrder =
      order ??
      (curr.sortField === field
        ? (curr.sortOrder === "asc" ? "desc" : "asc")
        : "asc");
    set({ sortField: field, sortOrder: nextOrder });
  },
});
