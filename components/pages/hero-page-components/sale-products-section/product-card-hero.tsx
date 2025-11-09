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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ProductMetrik, useEcommerce } from "@/hooks/use-ecommerce";

interface ProductCardHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  slug: string;
  brand: string;
  imagePrevievUrl: string | null;
  product: Product;
  titleBlock?: string;
  positionProduct?: number;
}
const ProductCardHero: React.FC<ProductCardHeroProps> = ({
  slug,
  name,
  imagePrevievUrl,
  brand,
  product,
  titleBlock,
  positionProduct,
}) => {
  const { cart, addToCart } = useCartStore();
  const { addToCart: addToCartMetrik } = useEcommerce();
  const { favorites, addToFavorites, removeFromFavorites } =
    useFavoritesStore();

  const addToCartHandle = async (addProduct: ProductMetrik) => {
    addToCart(product.documentId);
    toast("Товар добавлен в корзину");
    addToCartMetrik({ ...addProduct });
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
    <div className="relative h-full flex flex-col overflow-hidden bg-white group">
      <div className="relative w-full aspect-[2/1.8] p-1 rounded-lg overflow-hidden group-hover:shadow-sm transition-all">
        <div className="relative w-full h-full">
          {imagePrevievUrl && (
            <Image
              className="absolute object-contain w-full h-full"
              width={298}
              height={298}
              priority={false}
              src={process.env.NEXT_PUBLIC_API_BASE_URL + imagePrevievUrl}
              alt={`img_${name}`}
            />
          )}
        </div>
        <div className="absolute inset-0 bg-gray-400/5"></div>
      </div>
      <div className="absolute hidden  z-10 bottom-0 right-0 group-hover:flex transition-all justify-end items-end pr-3">
        <button
          onClick={
            !!favorites.find((i) => i === product.documentId)
              ? removeFavoriteHandle
              : addToFavoritesHandle
          }
          className="group"
        >
          <HeartIcon
            className={cn(
              "min-w-6 min-h-6 text-gray-200 mt-auto",
              !favorites.find((i) => i === product.documentId)
                ? ""
                : "fill-gray-100"
            )}
          />
        </button>
      </div>
      <Link className="absolute inset-0 z-0" href={`/product/${slug}`}></Link>
      {product?.sale ? (
        <div className="absolute top-2 right-2 bg-rose-100 rounded-sm font-bold py-1 px-3 text-xs text-rose-500">
          -{product?.sale}%
        </div>
      ) : null}
      <div className="pt-3 flex-1 flex h-full flex-col space-y-2 justify-between">
        <div className="">
          <h3 className="text-sm font-bold text-gray-900 line-clamp-2 text-balance">
            {brand + " " + name}
          </h3>
        </div>
        <div className="">
          {product?.series && (
            <div className="text-xs flex gap-2">
              <p className="text-gray-700">Серия:</p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <p className="font-semibold line-clamp-1">
                      {product?.series}
                    </p>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{product?.series}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
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
          {product.sale && (
            <div className="line-through text-gray-500 text-sm mt-2">
              {new Intl.NumberFormat("ru-RU").format(
                Number(product.price) +
                  Number(product.price) * (Number(product.sale) / 100)
              )}{" "}
              р.
            </div>
          )}
        </div>
        <div className="flex flex-col justify-end">
          <div className="flex justify-between items-end mt-auto">
            {!cart.find((i) => i.product === product.documentId) ? (
              <Button
                size="sm"
                onClick={() => {
                  return addToCartHandle({
                    id: product.documentId,
                    name: brand + " " + product.name,
                    price: isNaN(Number(product.price))
                      ? 0
                      : Number(product.price),
                    quantity: 1,
                    list: titleBlock || "Блок не указан",
                    position: positionProduct || 0,
                    brand: brand,
                    category: product.category?.name || "",
                  });
                }}
                disabled={!!cart.find((i) => i.product === product.documentId)}
                className="relative z-10 font-bold flex"
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
                <Link href="/cart">В корзине</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardHero;
