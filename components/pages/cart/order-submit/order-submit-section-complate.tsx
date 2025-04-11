import OrderSubmitWrapper from "./order-submit-wrapper";
import CartItemBasket from "../product-list/cart-item-basket";
import { Product } from "@/types/catalog";

export interface ProductWithCount {
  product: Product;
  count: number;
}

interface OrderSummarySectionComplateProps
  extends React.HTMLAttributes<HTMLDivElement> {
  productList?: ProductWithCount[];
  totalOrderPrice: number;
  totalProducts: number;
}

const OrderSummarySectionComplate: React.FC<
  OrderSummarySectionComplateProps
> = ({ productList, totalOrderPrice, totalProducts }) => {
  return (
    <OrderSubmitWrapper
      title="В заказе"
      totalCartPrice={totalOrderPrice}
      totalCount={totalProducts}
      disabled={true}
    >
      {productList?.map((item) => (
        <CartItemBasket
          key={item.product.id}
          slug={item.product.slug}
          name={item.product.name}
          brandName={item.product?.brand?.name}
          categoryName={item.product.category?.name}
          image={
            item?.product?.images?.length
              ? item?.product?.images[0]?.formats.small.url
              : null
          }
          disabled
          price={Number(item.product.price)}
          count={Number(item.count)}
        />
      ))}
    </OrderSubmitWrapper>
  );
};

export default OrderSummarySectionComplate;
