"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useFormContext } from "react-hook-form";

import { createOrder } from "@/data/order-api";
import { useCartStore } from "@/hooks/cart-store";
import { saveOrderId } from "@/utils/save-order-id";
import { useFetchCartProducts } from "@/queries/products";

import OrderSubmitWrapper from "./order-submit-wrapper";
import CartItemBasket from "../product-list/cart-item-basket";
import CartItemBasketSkeleton from "../product-list/cart-item-basket-skeleton";

import { Product } from "@/types/catalog";

const OrderSummarySection = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { handleSubmit, getValues } = useFormContext();
  const { cart, setProductQuantity, removeFromCart, clearCart } =
    useCartStore();
  const {
    data: productCart,
    isLoading,
    isError,
    isPending: isPandingFetch,
  } = useFetchCartProducts(cart);

  const productsWithCounts = productCart?.data.map((product: Product) => {
    const cartItem = cart.find((item) => item.product === product.id);
    return {
      product: product,
      count: cartItem ? cartItem.count : 0, // Если товара нет в корзине, count = 0
    };
  });

  const totalCount = cart.reduce((total, item) => total + item.count, 0);
  const totalCartPrice = productsWithCounts?.reduce((total, item) => {
    return total + Number(item.product.price) * item.count;
  }, 0);

  // console.log("ORDER SUBMIT SECTION");

  async function onSubmit() {
    const values = getValues();

    startTransition(async () => {
      try {
        const response = await createOrder({
          ...values,
          statusPay: "new",
          totalPrice: totalCartPrice ?? 0,
          products: cart,
        });

        if (response?.ok) {
          router.push(
            `/cart/order-success?orderId=${response?.data?.documentId}`
          );
          saveOrderId(response?.data?.documentId);
          localStorage.removeItem("cart-storage");
          clearCart();
        } else {
          toast.warning("Что-то пошло не так!");
        }
      } catch {
        toast.warning("Что-то пошло не так, попробуйте позже");
      }
    });
  }

  if (!cart || !cart.length) {
    return null;
  }

  return (
    <OrderSubmitWrapper
      title="В корзине"
      isError={isError}
      totalCartPrice={totalCartPrice || 0}
      totalCount={totalCount}
      onClick={handleSubmit(onSubmit)}
      disabled={isPending || !cart.length}
      buttonClearCart
    >
      {isLoading || isPandingFetch
        ? new Array(2)
            .fill("")
            .map((i, index) => <CartItemBasketSkeleton key={index} />)
        : productsWithCounts?.map((item) => (
            <CartItemBasket
              key={item.product.id}
              productId={item.product.id}
              name={item.product.name}
              slug={item.product.slug}
              brandName={item.product.brand?.name}
              categoryName={item.product.category?.name}
              image={
                item?.product?.images?.length
                  ? item?.product?.images[0]?.formats.small.url
                  : null
              }
              price={Number(item.product.price)}
              count={item.count}
              setCount={setProductQuantity}
              removeFromCart={removeFromCart}
            />
          ))}
    </OrderSubmitWrapper>
  );
};

export default OrderSummarySection;
