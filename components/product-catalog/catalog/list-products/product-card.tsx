import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/catalog";
import AddProductCartWrapper from "@/components/general/actions/add-product-cart-wrapper";
import { Button } from "@/components/ui/button";

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  slug: string;
  imagePrevievUrl: string | null;
  product: Product;
}
const ProductCard: React.FC<ProductCardProps> = ({
  slug,
  name,
  imagePrevievUrl,
  product,
}) => {
  return (
    <div className="relative flex flex-col overflow-hidden rounded-lg border bg-white">
      <div className="relative w-full aspect-square p-2">
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
      <div className="p-4 flex-1 flex h-full flex-col space-y-2 justify-between">
        <div className="">
          <p className="text-gray-500 text-sm italic">{product?.brand.name}</p>
          <h3 className="text-sm font-medium text-gray-900">
            <Link href={`/product/${slug}`}>
              {/* <span aria-hidden="true" className="absolute inset-0"></span> */}
              {name}
            </Link>
          </h3>
        </div>

        {/* <div className="text-xs flex gap-2">
          <p className="font-medium">тип компрессора</p>
          {product?.compressor_type}
        </div> */}
        {/* <div className="text-xs flex gap-2">
          <p className="font-medium">страна</p>
          {product?.country_of_manufacturer}
        </div> */}
        {/* <div className="text-xs flex gap-2">
          <p className="font-medium">энергопотребление</p>
          {product?.energy_efficiency_class}
        </div> */}
        {/* <div className="text-xs flex gap-2">
          <p className="font-medium">шум</p>
          {product?.noise_level}
        </div> */}
        {/* <div className="text-xs flex gap-2">
          <p className="font-medium">wifi</p>
          {product?.wifi_availability}
        </div> */}
        {/* <div className="text-xs flex gap-2">
          <p className="font-medium">хладогент</p>
          {product?.refrigerant}
        </div> */}
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
        {/* <div className="text-xs flex gap-2">
          <p className="font-medium">цвет</p>
          {product?.color}
        </div> */}
        <div className="flex flex-col justify-end">
          <div className="flex justify-between items-end mt-auto">
            <Button asChild className="relative z-10">
              <AddProductCartWrapper slug={product.slug} productId={product.id}>
                В корзину
              </AddProductCartWrapper>
            </Button>
            <p className="font-medium text-gray-900 text-base ">
              {new Intl.NumberFormat("ru-RU").format(Number(product?.price))} р.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
