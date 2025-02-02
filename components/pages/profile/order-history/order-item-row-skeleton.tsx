import { Skeleton } from "@/components/ui/skeleton";

const OrderItemRowSkeleton = () => {
  return (
    <>
      <tr>
        <td>
          <Skeleton className="h-[55px]" />
        </td>
        <td>
          <Skeleton className="h-[55px]" />
        </td>
        <td>
          <Skeleton className="h-[55px]" />
        </td>
        <td>
          <Skeleton className="h-[55px]" />
        </td>
      </tr>
      <tr>
        <td>
          <Skeleton className="h-[55px]" />
        </td>
        <td>
          <Skeleton className="h-[55px]" />
        </td>
        <td>
          <Skeleton className="h-[55px]" />
        </td>
        <td>
          <Skeleton className="h-[55px]" />
        </td>
      </tr>
    </>
  );
};

export default OrderItemRowSkeleton;
