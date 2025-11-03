import Link from "next/link";
import Image from "next/image";

import Select from "./select-item";
import TrashButton from "./trash-item-button";

interface CartItemBasketProps extends React.HTMLAttributes<HTMLLIElement> {
  name: string;
  slug: string;
  productId?: string;
  brandName?: string;
  categoryName?: string;
  image?: string | null;
  price: number;
  count: number;
  disabled?: boolean;
  setCount?: (productId: string, quantity: number) => void;
  removeFromCart?: (productId: string) => void;
}

const CartItemBasket: React.FC<CartItemBasketProps> = ({
  name,
  slug,
  productId,
  brandName,
  categoryName,
  image,
  price,
  count,
  disabled,
  setCount,
  removeFromCart,
}) => {
  return (
    <li className="flex px-4 py-6 lg:px-6 border-b">
      <div className="relative shrink-0 w-24 h-24 rounded-md p-1 bg-white">
        <Image
          className="w-full h-full object-contain"
          width={96}
          height={96}
          src={
            image
              ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${image}`
              : "/images/no-image.png"
          }
          alt="profuct_item_in_cart"
        />
        <span className="absolute inset-0 bg-gray-400/5"></span>
      </div>
      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="flex w-full">
          <div className="flex-1">
            <div className="flex justify-between">
              <h3 className="text-sm font-medium">
                <Link
                  href={`/product/${slug}`}
                  className="text-gray-700 font-semibold"
                >
                  {name}
                </Link>
              </h3>
            </div>
            <p className="text-gray-500 text-sm ">{brandName}</p>
            <p className="text-sm  text-gray-500">{categoryName}</p>
          </div>
          <div className="ml-4 shrink-0">
            <TrashButton
              removeFromCart={removeFromCart}
              productId={productId}
              disabled={disabled}
            />
          </div>
        </div>
        <div className="flex flex-1 items-end justify-between pt-2">
          <div className="text-sm font-semibold text-gray-900">
            {new Intl.NumberFormat("ru").format(price)} р.
          </div>
          <Select
            productId={productId}
            setCount={setCount}
            count={count}
            disabled={disabled}
          />
        </div>
      </div>
    </li>
  );
};

export default CartItemBasket;
