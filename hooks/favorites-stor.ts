import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// Тип для состояния хранилища
interface FavoritesState {
  favorites: number[];
  addToFavorites: (productId: number) => void;
  removeFromFavorites: (productId: number) => void;
  clearFavorites: () => void;
  getTotalCount: () => number;
}

// Создаём хранилище с `zustand` и `persist`
export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      // Добавление товара в корзину
      addToFavorites: (productId) =>
        set((state) => {
          const existingProduct = state.favorites.find(
            (item) => item === productId
          );
          if (existingProduct) {
            return state;
          } else {
            // Если товара нет, добавляем новый
            return {
              favorites: [...state.favorites, productId],
            };
          }
        }),

      // Удаление товара из корзины
      removeFromFavorites: (productId) =>
        set((state) => ({
          favorites: state.favorites.filter((item) => item !== productId),
        })),

      // Очистка корзины
      clearFavorites: () => set({ favorites: [] }),

      // Получение общего количества товаров
      getTotalCount: () => {
        const { favorites } = get(); // Получаем текущее состояние
        return favorites.length; // Суммируем количество товаров
      },
    }),

    {
      name: "favorites-storage", // Уникальное имя для localStorage
      storage: createJSONStorage(() => localStorage), // Используем localStorage
    }
  )
);
