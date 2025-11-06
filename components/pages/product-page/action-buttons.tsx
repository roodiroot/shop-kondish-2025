"use client";

import { Button } from "@/components/ui/button";
import { updateProductPopularity } from "@/data/product-api";
import { useCartStore } from "@/hooks/cart-store";
import { useFavoritesStore } from "@/hooks/favorites-stor";
import { ProductMetrik, useEcommerce } from "@/hooks/use-ecommerce";
import { cn } from "@/lib/utils";
import { HeartIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { toast } from "sonner";

interface ActionButtonsProps extends React.HTMLAttributes<HTMLDivElement> {
  productMetrik: ProductMetrik;
  documentId: string;
  slug: string;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  documentId,
  slug,
  productMetrik,
}) => {
  const { cart, addToCart } = useCartStore();
  const { addToCart: addToCartMetrik } = useEcommerce();
  const { favorites, addToFavorites, removeFromFavorites } =
    useFavoritesStore();

  const favoriteTrue = !!favorites.find((i) => i === documentId);
  const cartTrue = !!cart.find((i) => i.product === documentId);

  const addToCartHandle = async () => {
    addToCart(documentId);
    toast("Товар добавлен в корзину");
    addToCartMetrik({ ...productMetrik });
    await updateProductPopularity(slug, "cart_adds");
  };
  const addToFavoritesHandle = async () => {
    addToFavorites(documentId);
    toast("Товар добавлен в избранное");
    await updateProductPopularity(slug, "favorites");
  };

  const removeFavoriteHandle = () => {
    removeFromFavorites(documentId);
    toast("Товар удален из избранного");
  };

  return (
    <div className="flex gap-4 flex-row items-center mt-10">
      {!cart.find((i) => i.product === documentId) ? (
        <Button onClick={addToCartHandle} disabled={cartTrue} size="lg">
          Добавить в корзину
        </Button>
      ) : (
        <Button variant="secondary" size="lg" asChild>
          <Link href="/cart">Перейти в корзину</Link>
        </Button>
      )}

      <Button
        onClick={favoriteTrue ? removeFavoriteHandle : addToFavoritesHandle}
        className={cn(favoriteTrue ? "text-rose-500" : "text-gray-400")}
        size="icon"
        variant="ghost"
      >
        <HeartIcon className={cn("min-w-6 min-h-6")} />
      </Button>
    </div>
  );
};

export default ActionButtons;
