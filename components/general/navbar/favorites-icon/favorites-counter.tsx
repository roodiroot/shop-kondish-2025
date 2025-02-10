"use client";

import { useFavoritesStore } from "@/hooks/favorites-stor";
import { useEffect, useState } from "react";

const FavoritesCounter = () => {
  const { getTotalCount } = useFavoritesStore();
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(getTotalCount());
    // Подписка на изменения в состоянии корзины
    const unsubscribe = useFavoritesStore.subscribe((state) => {
      setCount(state.getTotalCount());
    });
    // Отписка от изменений при размонтировании компонента
    return () => unsubscribe();
  }, [getTotalCount]);

  return <span>{count || ""}</span>;
};

export default FavoritesCounter;
