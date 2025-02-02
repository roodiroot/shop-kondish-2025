"use client";

import OrderRow from "./order-row";
import OrderHeader from "./order-header";
import OrderHeaaderTable from "./order-header-table";
import OrderItemRowSkeleton from "./order-item-row-skeleton";

import { useFetchOrder } from "@/queries/products";

interface OrderItemProps {
  orderId: string;
}

const OredrItem: React.FC<OrderItemProps> = ({ orderId }) => {
  const { data, isLoading } = useFetchOrder(orderId);

  return (
    <div>
      <h3 className="sr-only">
        Order placed on <time dateTime="2021-01-22">January 22, 2021</time>
      </h3>
      <OrderHeader
        documentId={data?.order.documentId}
        orderId={data?.order.id}
        totalPrice={data?.order.totalPrice}
        date={data?.order.createdAt}
      />
      <table className="text-sm mt-1 w-full text-gray-500 sm:mt-2">
        <OrderHeaaderTable />
        <tbody className="border-b text-sm sm:border-t">
          {isLoading ? (
            <OrderItemRowSkeleton />
          ) : (
            data?.order.products.map((i) => (
              <OrderRow
                key={i.slug}
                name={i.name}
                price={i.price}
                count={i.count}
                slug={i.slug}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OredrItem;
