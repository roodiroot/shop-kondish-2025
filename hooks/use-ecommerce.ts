"use client";

import { useCallback } from "react";

export type ProductMetrik = {
  id: string;
  name: string;
  price: number;
  brand: string;
  category: string;
  quantity: number;
  list: string; //"Выдача категории";
  position: number;
};

type Order = {
  id: string | number;
  products: ProductMetrik[];
};

const METRIKA_ID = 105133061;

export function useEcommerce() {
  // Ждём, пока Метрика и dataLayer будут доступны
  const ensureDataLayerReady = useCallback(() => {
    if (typeof window === "undefined") return false;
    const hasMetrika = typeof (window as any).ym === "function";
    const hasDataLayer = Array.isArray((window as any).dataLayer);
    if (!hasDataLayer) (window as any).dataLayer = [];
    return hasMetrika;
  }, []);

  // Безопасный пуш с проверкой загрузки Метрики
  const pushToDataLayer = useCallback(
    (data: object) => {
      if (!ensureDataLayerReady()) {
        // 🕐 Если Метрика ещё не загрузилась, откладываем пуш
        const interval = setInterval(() => {
          if (ensureDataLayerReady()) {
            (window as any).dataLayer.push(data);
            clearInterval(interval);
          }
        }, 500);
        // через 5 секунд перестаём ждать
        setTimeout(() => clearInterval(interval), 5000);
        return;
      }
      (window as any).dataLayer.push(data);
    },
    [ensureDataLayerReady]
  );

  const viewProduct = useCallback(
    (product: ProductMetrik) => {
      pushToDataLayer({
        ecommerce: {
          detail: {
            products: [product],
          },
        },
      });
    },
    [pushToDataLayer]
  );

  const addToCart = useCallback(
    (product: ProductMetrik) => {
      pushToDataLayer({
        ecommerce: {
          currencyCode: "RUB",
          add: {
            products: [product],
          },
        },
      });
    },
    [pushToDataLayer]
  );

  const removeFromCart = useCallback(
    (product: ProductMetrik) => {
      pushToDataLayer({
        ecommerce: {
          remove: {
            products: [product],
          },
        },
      });
    },
    [pushToDataLayer]
  );

  const purchase = useCallback(
    (order: Order) => {
      pushToDataLayer({
        ecommerce: {
          purchase: {
            actionField: {
              id: order.id,
            },
            products: order.products,
          },
        },
      });
    },
    [pushToDataLayer]
  );

  const reachGoal = useCallback(
    (goalName: string, params?: Record<string, any>) => {
      if (typeof window === "undefined") return;
      if (typeof (window as any).ym !== "function") {
        // если Метрика не готова — подождать
        const interval = setInterval(() => {
          if (typeof (window as any).ym === "function") {
            (window as any).ym(METRIKA_ID, "reachGoal", goalName, params);
            clearInterval(interval);
          }
        }, 500);
        setTimeout(() => clearInterval(interval), 5000);
        return;
      }
      (window as any).ym(METRIKA_ID, "reachGoal", goalName, params);
    },
    []
  );

  const hit = useCallback((url: string) => {
    if (typeof window === "undefined") return;
    if (typeof (window as any).ym === "function") {
      (window as any).ym(METRIKA_ID, "hit", url);
    } else {
      // Если Метрика ещё не готова — подождать
      const interval = setInterval(() => {
        if (typeof (window as any).ym === "function") {
          (window as any).ym(METRIKA_ID, "hit", url);
          clearInterval(interval);
        }
      }, 500);
      setTimeout(() => clearInterval(interval), 5000);
    }
  }, []);

  return { viewProduct, addToCart, removeFromCart, purchase, reachGoal, hit };
}
