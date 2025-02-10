import Link from "next/link";

interface ItemSliderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  href: string;
}

const ItemSlider: React.FC<ItemSliderProps> = ({ href, title }) => {
  return (
    <div className="rounded-xl bg-gray-50 overflow-hidden relative">
      <div className="flex aspect-[2/1] sm:aspect-[2.46/1] items-center justify-center p-6">
        <Link href={href} className="absolute inset-0 line-clamp-2 p-3">
          {title}
        </Link>
      </div>
    </div>
  );
};

export default ItemSlider;
