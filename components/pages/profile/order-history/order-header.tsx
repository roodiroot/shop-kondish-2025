import Link from "next/link";

import { Button } from "@/components/ui/button";

interface OrderHeaaderTableProps extends React.HTMLAttributes<HTMLDivElement> {
  documentId?: string;
  date?: string;
  orderId?: number;
  totalPrice?: number;
}
const OrderHeader: React.FC<OrderHeaaderTableProps> = ({
  documentId,
  date,
  orderId,
  totalPrice,
}) => {
  let dateLocal;
  if (date) {
    dateLocal = new Date(date).toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  return (
    <div className="rounded-lg bg-gray-50 px-4 py-6 sm:flex sm:items-center sm:justify-between sm:px-6">
      <dl className="space-y-4  flex-auto text-sm text-gray-700 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-x-6 lg:w-2/3 lg:flex-none lg:gap-x-8">
        <div className="flex justify-between border-b sm:border-0 sm:block ">
          <dt className="font-medium text-gray-900 whitespace-nowrap">
            Дата создания
          </dt>
          <dd className="sm:mt-1 ">
            <time
              dateTime={dateLocal && dateLocal.split(".").join("-")}
              className="whitespace-nowrap "
            >
              {dateLocal ? dateLocal : " "}
            </time>
          </dd>
        </div>
        <div className="flex justify-between pt-4 sm:pt-0 border-b sm:border-0 sm:block">
          <dt className="font-medium text-gray-900 whitespace-nowrap">
            Номер заказа
          </dt>
          <dd className="sm:mt-1">
            <time dateTime="2021-01-22">{orderId}</time>
          </dd>
        </div>
        <div className="flex justify-between pt-4 sm:pt-0 sm:block">
          <dt className="font-medium text-gray-900">Стоимость</dt>
          <dd className="sm:mt-1 font-semibold">
            {totalPrice ? new Intl.NumberFormat("ru").format(totalPrice) : ""}{" "}
            р.
          </dd>
        </div>
      </dl>
      <Button
        asChild
        variant="outline"
        className="mt-6 w-full sm:mt-0 sm:w-auto"
      >
        <Link href={`/protected/order?orderId=${documentId}`}>Подробнее</Link>
      </Button>
    </div>
  );
};

export default OrderHeader;
