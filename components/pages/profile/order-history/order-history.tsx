import OredrItem from "./order-item";

interface OrderHistoryProps {
  orders?: string[];
}

export const OrderHistory: React.FC<OrderHistoryProps> = ({ orders }) => {
  return (
    <div className="space-y-12">
      {orders ? (
        orders.map((i) => <OredrItem key={i} orderId={i} />)
      ) : (
        <div className="text-center text-sm text-gray-500">
          Вы пока еще ничего не купили.
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
