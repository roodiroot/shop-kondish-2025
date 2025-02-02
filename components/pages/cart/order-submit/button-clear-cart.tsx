"use client";

import { cn } from "@/lib/utils";
import { useCartStore } from "@/hooks/cart-store";
import { TrashIcon } from "@heroicons/react/24/solid";

interface ButtonClearCartProps
  extends React.HTMLAttributes<HTMLButtonElement> {}

const ButtonClearCart: React.FC<ButtonClearCartProps> = ({
  className,
  ...props
}) => {
  const { clearCart } = useCartStore();
  return (
    <button
      {...props}
      onClick={clearCart}
      className={cn(
        "flex items-center gap-2 text-sm px-2 py-1 bg-sky-50 text-sky-700 hover:bg-sky-100 rounded-sm transition",
        className
      )}
    >
      Очистить корзину
      <TrashIcon className="w-4 h-4" />
    </button>
  );
};

export default ButtonClearCart;
