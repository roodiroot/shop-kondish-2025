import ItemBrand from "./item-brand";

import { Brand } from "@/types/catalog";

interface BrandsListProps extends React.HTMLAttributes<HTMLDivElement> {
  brandsList?: Brand[];
}

const BrandsList: React.FC<BrandsListProps> = ({ brandsList }) => {
  return (
    <div className="flex flex-row gap-4 py-6 w-full flex-wrap justify-center">
      {brandsList?.map((i) => (
        <ItemBrand key={i.slug} name={i.name} slug={i.slug} image={i?.image} />
      ))}
    </div>
  );
};

export default BrandsList;
