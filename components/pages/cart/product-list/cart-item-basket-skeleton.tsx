import { Skeleton } from "@/components/ui/skeleton";

const CartItemBasketSkeleton = () => {
  return (
    <li className=" border-b">
      <Skeleton className="h-[141px]" />
    </li>
  );
};

export default CartItemBasketSkeleton;
