import OrderSummarySectionComplate from "@/components/pages/cart/order-submit/order-submit-section-complate";
import { getOrderById } from "@/data/order-api";
import { getAllProductsByIds } from "@/data/product-api";
import { Product } from "@/types/catalog";
import { getDeliveryTypeLabel } from "@/utils/mappings";
import { Metadata } from "next";

type Props = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export interface ProductWithCount {
  product: Product;
  count: number;
}

export const metadata: Metadata = {
  title: "Заказ принят",
  description:
    "Спасибо за ваш выбор! Мы с радостью обработаем ваш заказ. Информация о заказе отправлена вам на почту.",
  icons: "/kondish.svg",
};

export default async function OrderSuccess({ searchParams }: Props) {
  const orderId = (await searchParams).orderId;
  const order = await getOrderById(orderId || "");
  const products = await getAllProductsByIds(
    order.order.products.map((product) => product.productId)
  );
  const productsWithCounts = products.data.map((product) => {
    const cartItem = order.order.products.find(
      (item) => item.productId === product.documentId
    );
    return {
      product,
      count: cartItem ? Number(cartItem.count) : 0,
    };
  });

  const totalProducts = order.order.products.reduce(
    (total, item) => total + Number(item.count),
    0
  );

  return (
    <div className="mt-12 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-12 xl:gap-x-16">
      <section>
        <div className="flex justify-between items-end py-2">
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Заказ №{order.order.id} успешно создан
            </h2>
            <p className="mt-2 max-w-xl text-sm text-gray-700">
              Благодарим Вас за заказ, и уже начали его собирать. Уведомления о
              статусе заказа вам сообщит менеджер по телефону.
            </p>
          </div>
        </div>
        <section className="mt-4">
          <h3 className="text-lg font-semibold">Информация о доставке</h3>
          <div className="text-sm mt-2">
            <p className="font-medium">Адресная доставка</p>
            <p className="text-gray-500">{order.order.delivery.address}</p>
          </div>
          <div className="text-sm mt-2">
            <p className="font-medium">Контактное лицо</p>
            <p className="text-gray-500">{order.order.contact.fullName}</p>
          </div>
          <div className="text-sm mt-2">
            <p className="font-medium">Email для связи</p>
            <p className="text-gray-500">{order.order.contact.email}</p>
          </div>
        </section>
        <section className="mt-4">
          <h3 className="text-lg font-semibold">Информация об оплате</h3>
          <div className="text-sm mt-2">
            <p className="font-medium">Способ оплаты</p>
            <p className="text-gray-500">
              {getDeliveryTypeLabel(order.order.payment)}
            </p>
          </div>
        </section>
      </section>

      {/* Компонент суммы заказа */}
      <OrderSummarySectionComplate
        productList={productsWithCounts}
        totalOrderPrice={order.order.totalPrice}
        totalProducts={totalProducts}
      />
    </div>
  );
}
