"use client";

import { toast } from "sonner";

import { useCartStore } from "@/hooks/cart-store";
import { updateProductPopularity } from "@/data/product-api";

interface AddProductCartWrapperProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  productId: string;
  slug: string;
}

const AddProductCartWrapper: React.FC<AddProductCartWrapperProps> = ({
  productId,
  slug,
  children,
  ...props
}) => {
  const { addToCart } = useCartStore();
  const addToCartHandle = async () => {
    addToCart(productId);
    toast("Товар добавлен в корзину");
    await updateProductPopularity(slug, "cart_adds");
  };
  return (
    <button {...props} onClick={addToCartHandle}>
      {children}
    </button>
  );
};

export default AddProductCartWrapper;
