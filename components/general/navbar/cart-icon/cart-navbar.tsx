import { ShoppingBagIcon } from "@heroicons/react/24/outline";

import { cn } from "@/lib/utils";
import Link from "next/link";
import CartCounter from "./cart-counter";

const CartNavbar: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <div {...props} className={cn("flow-root", className)}>
      <Link href="/cart" className="group -m-2 flex items-center p-2">
        <ShoppingBagIcon
          aria-hidden="true"
          className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
        />
        <div className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
          <CartCounter />
        </div>
        <span className="sr-only">items in cart, view bag</span>
      </Link>
    </div>
  );
};

export default CartNavbar;
