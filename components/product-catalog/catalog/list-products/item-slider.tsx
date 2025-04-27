import { ImageForProduct } from "@/types/catalog";
import Image from "next/image";
import Link from "next/link";

interface ItemSliderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  href: string;
  image?: ImageForProduct | null;
}

const ItemSlider: React.FC<ItemSliderProps> = ({ href, title, image }) => {
  const path = image?.formats?.medium?.url
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${image?.formats?.medium?.url}`
    : "";
  return (
    <div className="rounded-xl bg-gray-100 overflow-hidden relative">
      <div className="relative z-10 flex aspect-[2/1.3] sm:aspect-[2.26/1] items-center justify-center p-6">
        <div className="absolute inset-0 line-clamp-2 p-3 text-xs sm:text-lg font-bold">
          {title}
        </div>
      </div>
      {path && (
        <div className="absolute z-0 w-[60%] h-[70%] bottom-0 right-2 sm:bottom-4 sm:right-4">
          <Image
            className="absolute object-contain w-full h-full"
            fill
            priority={false}
            src={path}
            alt={`img_${title}`}
          />
        </div>
      )}
      <Link href={href} className="absolute inset-0 z-20"></Link>
    </div>
  );
};

export default ItemSlider;
