import { ImageForProduct } from "@/types/catalog";
import Image from "next/image";
import Link from "next/link";

interface ItemBrandProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  slug: string;
  image?: ImageForProduct | null;
}

const ItemBrand: React.FC<ItemBrandProps> = ({ name, slug, image }) => {
  const path = image?.url
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${image?.url}`
    : "";
  return (
    <div className="w-full max-w-[292px] rounded-xl bg-gray-200 overflow-hidden relative">
      <div className="flex aspect-[2/1] sm:aspect-[2.46/1] items-center justify-center p-6">
        <div className="absolute inset-0 line-clamp-2 p-3 text-lg font-bold">
          {name}
        </div>
      </div>
      {path && (
        <div className="absolute z-0 w-[60%] h-[50%] bottom-2 right-2 sm:bottom-4 sm:right-4">
          <Image
            className="absolute object-contain w-full h-full"
            fill
            priority={false}
            src={path}
            alt={`${name}`}
          />
        </div>
      )}
      <Link
        href={`/catalog/brands/${slug}`}
        className="absolute inset-0 z-20"
      ></Link>
    </div>
  );
};

export default ItemBrand;
