"use client";

import Link from "next/link";
import { toast } from "sonner";
import Image from "next/image";
import { HeartIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Product } from "@/types/catalog";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/hooks/cart-store";
import { useFavoritesStore } from "@/hooks/favorites-stor";
import { updateProductPopularity } from "@/data/product-api";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  slug: string;
  brand: string;
  imagePrevievUrl: string | null;
  product: Product;
}
const ProductCard: React.FC<ProductCardProps> = ({
  slug,
  name,
  brand,
  imagePrevievUrl,
  product,
}) => {
  const { cart, addToCart } = useCartStore();
  const { favorites, addToFavorites, removeFromFavorites } =
    useFavoritesStore();

  const addToCartHandle = async () => {
    addToCart(product.documentId);
    toast("Товар добавлен в корзину");
    await updateProductPopularity(slug, "cart_adds");
  };
  const addToFavoritesHandle = async () => {
    addToFavorites(product.documentId);
    toast("Товар добавлен в избранное");
    await updateProductPopularity(slug, "favorites");
  };

  const removeFavoriteHandle = () => {
    removeFromFavorites(product.documentId);
    toast("Товар удален из избранного");
  };

  return (
    <div className="relative flex flex-col overflow-hidden bg-white">
      <div className="relative w-full aspect-square p-2  overflow-hidden rounded-lg">
        <div className="relative w-full h-full">
          {imagePrevievUrl && (
            <Image
              className="absolute object-contain w-full h-full"
              width={298}
              height={298}
              priority={false}
              src={imagePrevievUrl}
              alt={`img_${name}`}
            />
          )}
        </div>
        <div className="absolute inset-0 bg-gray-400/5"></div>
      </div>
      <div className="absolute top-0.5 left-0.5">
        <button
          onClick={
            !!favorites.find((i) => i === product.documentId)
              ? removeFavoriteHandle
              : addToFavoritesHandle
          }
          className="p-2 group"
        >
          <HeartIcon
            className={cn(
              "min-w-6 min-h-6 text-gray-300",
              !favorites.find((i) => i === product.documentId)
                ? ""
                : "fill-gray-200"
            )}
          />
        </button>
      </div>
      {product?.sale ? (
        <div className="absolute top-2 right-2 bg-rose-100 rounded-sm font-bold py-1 px-3 text-xs text-rose-500">
          -{product?.sale}%
        </div>
      ) : null}
      <div className="pt-4 flex-1 flex h-full flex-col space-y-2 justify-between">
        <div className="">
          {/* <p className="text-gray-500 text-sm italic">{product?.brand?.name}</p> */}
          <h3 className="text-sm font-bold text-gray-900">
            <Link href={`/product/${slug}`}>{brand + " " + name}</Link>
          </h3>
        </div>
        <div className="">
          {product?.series && (
            <div className="text-xs flex gap-2">
              <p className="text-gray-700">Серия:</p>
              <p className="font-semibold">{product?.series}</p>
            </div>
          )}
          {product?.compressor_type === "Инвертор" && (
            <div className="text-xs flex gap-2">
              <p className="text-gray-700">Тип компрессора:</p>
              <p className="font-semibold">{product?.compressor_type}</p>
            </div>
          )}
          {product?.area_of_room && (
            <div className="text-xs flex gap-2">
              <p className=" text-gray-700">Помещение:</p>
              <p className="font-semibold">{product?.area_of_room} м².</p>
            </div>
          )}
        </div>
        {product.sale && (
          <div className="line-through text-gray-500 text-sm">
            {new Intl.NumberFormat("ru-RU").format(
              Number(product.price) +
                Number(product.price) * (Number(product.sale) / 100)
            )}{" "}
            р.
          </div>
        )}
        <div className="flex flex-col justify-end">
          <div className="flex justify-between items-end mt-auto">
            {!cart.find((i) => i.product === product.documentId) ? (
              <Button
                size="sm"
                onClick={addToCartHandle}
                disabled={!!cart.find((i) => i.product === product.documentId)}
                className="relative z-10 font-semibold flex"
              >
                <span className="pr-2 border-r border-white/40">
                  {new Intl.NumberFormat("ru-RU").format(Number(product.price))}{" "}
                  р.
                </span>
                <ShoppingCartIcon className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                size="sm"
                variant="secondary"
                className="font-semibold"
                asChild
              >
                <Link href="/cart">В корзину</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
