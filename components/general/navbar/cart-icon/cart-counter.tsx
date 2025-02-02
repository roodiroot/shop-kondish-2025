"use client";

import { useCartStore } from "@/hooks/cart-store";
import { useEffect, useState } from "react";

const CartCounter = () => {
  const getTotalCount = useCartStore((state) => state.getTotalCount);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(getTotalCount());
    // Подписка на изменения в состоянии корзины
    const unsubscribe = useCartStore.subscribe((state) => {
      setCount(state.getTotalCount());
    });
    // Отписка от изменений при размонтировании компонента
    return () => unsubscribe();
  }, [getTotalCount()]);

  return <span>{count}</span>;
};

export default CartCounter;
