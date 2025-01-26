import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// Тип для элемента корзины
interface CartItem {
  product: number; // ID товара
  count: number; // Количество
}

// Тип для состояния хранилища
interface CartState {
  cart: CartItem[];
  addToCart: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  decrementProduct: (productId: number) => void;
  setProductQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalCount: () => number;
}

// Создаём хранилище с `zustand` и `persist`
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      // Добавление товара в корзину
      addToCart: (productId) =>
        set((state) => {
          const existingProduct = state.cart.find(
            (item) => item.product === productId
          );
          if (existingProduct) {
            // Если товар уже есть, увеличиваем количество
            return {
              cart: state.cart.map((item) =>
                item.product === productId
                  ? { ...item, count: item.count + 1 }
                  : item
              ),
            };
          } else {
            // Если товара нет, добавляем новый
            return {
              cart: [...state.cart, { product: productId, count: 1 }],
            };
          }
        }),

      // Удаление товара из корзины
      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.product !== productId),
        })),

      // Уменьшение количества товара
      decrementProduct: (productId) =>
        set((state) => ({
          cart: state.cart
            .map((item) =>
              item.product === productId
                ? { ...item, count: item.count - 1 }
                : item
            )
            .filter((item) => item.count > 0), // Удаляем, если количество стало 0
        })),

      // Установка точного количества товара
      setProductQuantity: (productId, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            // Если количество 0 или меньше, удаляем товар
            return {
              cart: state.cart.filter((item) => item.product !== productId),
            };
          }

          const existingProduct = state.cart.find(
            (item) => item.product === productId
          );
          if (existingProduct) {
            // Если товар уже есть, обновляем количество
            return {
              cart: state.cart.map((item) =>
                item.product === productId ? { ...item, count: quantity } : item
              ),
            };
          } else {
            // Если товара нет, добавляем его с указанным количеством
            return {
              cart: [...state.cart, { product: productId, count: quantity }],
            };
          }
        }),

      // Очистка корзины
      clearCart: () => set({ cart: [] }),

      // Получение общего количества товаров
      getTotalCount: () => {
        const { cart } = get(); // Получаем текущее состояние
        // console.log("TOTALCOUNTER");
        return cart.reduce((total, item) => total + item.count, 0); // Суммируем количество товаров
      },
    }),
    {
      name: "cart-storage", // Ключ для localStorage
      storage: createJSONStorage(() => localStorage), // Используем localStorage
    }
  )
);
