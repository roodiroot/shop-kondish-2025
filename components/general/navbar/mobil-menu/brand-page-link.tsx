import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const BrandPageLink = ({
  brands,
  closeDrawer,
}: {
  brands: { name: string; slug: string }[];
  closeDrawer: (value: boolean) => void;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <li className="text-sm font-semibold text-white">
      <div onClick={() => setIsOpen(true)} className="flex gap-1 items-center">
        Бренды <ChevronRight className="size-4" />
      </div>
      {isOpen && (
        <div className="absolute inset-0 bg-primary  px-4 py-8 border-b border-white/60">
          <div
            onClick={() => setIsOpen(false)}
            className="flex gap-1 items-center mb-6  uppercase"
          >
            <ChevronLeft className="size-4" /> Назад
          </div>
          <ul className="flex flex-col gap-5">
            {brands?.map((page) => (
              <li key={page.name} className="text-sm font-semibold text-white">
                <Link
                  onClick={() => closeDrawer(false)}
                  href={`/catalog/brands/${page.slug}`}
                >
                  {page.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};

export default BrandPageLink;
