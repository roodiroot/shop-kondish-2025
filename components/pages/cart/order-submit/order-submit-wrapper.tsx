import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ButtonClearCart from "./button-clear-cart";

interface OrderSubmitWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  totalCount: number;
  totalCartPrice: number;
  disabled?: boolean;
  isError?: boolean;
  onClick?: () => void;
  buttonClearCart?: boolean;
}

const OrderSubmitWrapper: React.FC<OrderSubmitWrapperProps> = ({
  title,
  children,
  totalCartPrice,
  totalCount,
  disabled,
  isError,
  onClick,
  buttonClearCart,
}) => {
  return (
    <section className="mt-10 lg:mt-0">
      <h2 className="text-lg font-medium text-gray-900">{title}</h2>
      {isError ? (
        <div className="text-sm py-1 px-2 rounded-sm bg-red-100 text-destructive">
          Не удалось загрузить данные
        </div>
      ) : null}
      <div
        className={cn(
          "mt-4 rounded-lg border border-gray-200 shadow-sm",
          disabled && "bg-gray-50"
        )}
      >
        <ul className="">{children}</ul>
        <dl className="px-4 py-6 lg:px-6 border-b space-y-4">
          <div className="flex items-center justify-between first:border-0 border-t">
            <dt className="text-gray-900 text-sm font-medium">Всего товаров</dt>
            <dd className="text-sm font-medium text-gray-900">{totalCount}</dd>
          </div>
          <div className="flex items-center justify-between pt-4 first:border-0 border-t">
            <dt className="text-gray-900 font-medium">На сумму</dt>
            <dd className="text-sm font-medium text-gray-900">
              {new Intl.NumberFormat("ru").format(totalCartPrice ?? 0)} р.
            </dd>
          </div>
        </dl>
        <div className="px-4 py-6 lg:px-6">
          <Button
            type="submit"
            form="order-form"
            className="w-full"
            disabled={disabled}
            onClick={onClick}
          >
            Оформить заказ
          </Button>
        </div>
      </div>
      {buttonClearCart && <ButtonClearCart className="mt-2" />}
    </section>
  );
};

export default OrderSubmitWrapper;
