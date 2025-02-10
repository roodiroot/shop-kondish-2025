import Link from "next/link";

interface ItemBrandProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  slug: string;
}

const ItemBrand: React.FC<ItemBrandProps> = ({ name, slug }) => {
  return (
    <div className="w-full max-w-[292px] rounded-xl bg-gray-50 overflow-hidden relative">
      <div className="flex aspect-[2/1] sm:aspect-[2.46/1] items-center justify-center p-6">
        <Link
          href={`/catalog/brands/${slug}`}
          className="absolute inset-0 line-clamp-2 p-3"
        >
          {name}
        </Link>
      </div>
    </div>
  );
};

export default ItemBrand;
