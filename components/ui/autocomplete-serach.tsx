"use client";

import { memo } from "react";
import Image from "next/image";

import { HistoryIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { ProductsData } from "@/types/catalog";
import { CatalogForNavbar } from "../general/navbar/navbar";
import { cn } from "@/lib/utils";

interface AutocompleteSearchProps
  extends React.HTMLAttributes<HTMLUListElement> {
  navigation: CatalogForNavbar;
  historySearch: string[];
  products: ProductsData | null;
  setHistorySearch: (value: string[]) => void;
  handleSubmit: (value: string) => void;
  setIsOpen: (value: boolean) => void;
}

const AutocompleteSearch: React.FC<AutocompleteSearchProps> = ({
  navigation,
  historySearch,
  products,
  setHistorySearch,
  handleSubmit,
  setIsOpen,
  ...props
}) => {
  const router = useRouter();

  return (
    <ul className={cn("", props.className)}>
      <li className="px-3">
        <ul className="flex flex-wrap gap-1">
          {navigation?.brands?.map((brand) => (
            <li
              key={brand.slug}
              onClick={() => handleSubmit(brand.name)}
              className="px-1 py-0.5 bg-primary/15 border-primary border-2 text-primary text-sm rounded-sm cursor-pointer"
            >
              {brand.name}
            </li>
          ))}
        </ul>
      </li>
      <li>
        {historySearch.length ? (
          <div className="px-3 flex justify-between gap-4 mt-5 text-sm">
            <div className="uppercase font-bold">История</div>
            <button
              onClick={() => {
                setHistorySearch([]);
                localStorage.removeItem("historySearch");
              }}
              className="text-gray-600 hover:text-gray-900"
            >
              Очистить
            </button>
          </div>
        ) : (
          ""
        )}

        <ul className=" flex flex-col-reverse">
          {historySearch.map((i) => (
            <li
              key={i}
              className="flex items-center gap-1 cursor-pointer hover:bg-gray-50 py-1.5 px-3 rounded-sm"
              onClick={() => handleSubmit(i)}
            >
              <HistoryIcon className="size-4 text-gray-300" />
              {i}
            </li>
          ))}
        </ul>
        {products && (
          <div className="px-3 mt-4">
            <div className="uppercase font-bold text-sm">Популярные товары</div>
            {products.data.map((item) => (
              <div
                key={item.slug}
                className="relative p-2 flex gap-4 hover:bg-gray-50 rounded-md"
              >
                <div
                  onClick={() => {
                    router.push(`/product/${item.slug}`);
                    setIsOpen(false);
                  }}
                  className="absolute inset-0 cursor-pointer"
                />
                <div className="relative aspect-square w-16 p-2 bg-white overflow-hidden rounded-md ">
                  <div className="relative w-full h-full">
                    <Image
                      className="absolute object-contain w-full h-full"
                      width={100}
                      height={100}
                      priority={false}
                      src={
                        item?.images?.[0]?.formats?.small?.url
                          ? process.env.NEXT_PUBLIC_API_BASE_URL +
                            item?.images[0]?.formats?.small?.url
                          : item?.images?.[0]?.formats?.thumbnail?.url
                          ? process.env.NEXT_PUBLIC_API_BASE_URL +
                            item?.images[0]?.formats?.thumbnail?.url
                          : "/images/no-image.png"
                      }
                      alt={`img_${item.name}`}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gray-400/5"></div>
                </div>
                <div className="flex flex-1 flex-col">
                  <h4 className="text-sm font-bold">
                    {item.brand?.name + " " + item.name}
                  </h4>
                  <div className="text-sm ">{item.category?.name}</div>
                  <div className="text-sm mt-auto font-bold">
                    {new Intl.NumberFormat("ru-RU").format(Number(item.price))}{" "}
                    р.
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </li>
    </ul>
  );
};

export default memo(AutocompleteSearch);
