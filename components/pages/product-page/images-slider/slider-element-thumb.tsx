"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";

interface SliderElementThumbProps
  extends React.HtmlHTMLAttributes<HTMLElement> {
  images: string[];
  onSlideChange: (index: number) => void;
  currentIndex: number;
}

const SliderElementThumb: React.FC<SliderElementThumbProps> = ({
  images,
  onSlideChange,
  currentIndex,
  className,
  ...props
}) => {
  // console.log(`${process.env.NEXT_PUBLIC_API_BASE_URL}${images[0]}`);
  return (
    <div {...props} className={cn("grid grid-cols-4 gap-6", className)}>
      {images.map((imageUrl, index) => (
        <button
          key={imageUrl}
          onClick={() => onSlideChange(index)}
          className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase"
        >
          <span className="absolute inset-0 overflow-hidden p-[10%] rounded-md">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${imageUrl}`}
              alt="item_product"
              className="h-full w-full object-contain object-center"
              width={150}
              height={100}
            />
            <span className="absolute inset-0 bg-gray-400/5"></span>
          </span>
          {index === currentIndex && (
            <span className="absolute z-10 pointer-events-none inset-0 rounded-md border-2 border-accent-600"></span>
          )}
        </button>
      ))}
    </div>
  );
};

export default SliderElementThumb;
