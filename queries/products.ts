import { getOrderById } from "@/data/order-api";
import {
  CartItem,
  getAllProducts,
  getAllProductsCart,
} from "@/data/product-api";
import { useQuery } from "@tanstack/react-query";

// Получение всех товаров
export const useFetchProducts = (string_params?: string) => {
  // console.log(string_params);
  return useQuery({
    queryKey: ["products", string_params],
    queryFn: () =>
      getAllProducts(`${string_params ? string_params + "&" : "?"}populate=*`),
  });
};

// Получение товаров которые добавлены в корзину
export const useFetchCartProducts = (cart: CartItem[]) => {
  // console.log("FETCJ PROD");
  return useQuery({
    queryKey: ["cart-products", cart],
    queryFn: () => getAllProductsCart(cart),
    enabled: cart.length > 0, // Запрос выполняется только если корзина не пуста
    staleTime: 1000 * 60 * 5, // Данные будут кэшироваться на 5 минут
  });
};
// Получение оформленного заказа
export const useFetchOrder = (documentId: string) => {
  // console.log("FETCJ PROD");
  return useQuery({
    queryKey: ["order-products", documentId],
    queryFn: () => getOrderById(documentId),
    enabled: !!documentId,
    staleTime: 1000 * 60 * 5, // Данные будут кэшироваться на 5 минут
  });
};
