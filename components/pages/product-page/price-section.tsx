interface PriceSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  price?: string;
}
const PriceSection: React.FC<PriceSectionProps> = ({ price: priceString }) => {
  const price = Number.parseFloat(priceString || "");

  if (isNaN(price)) {
    return (
      <div className="mt-3">
        <h2 className="sr-only">Information about the product</h2>
        <p className="text-3xl tracking-tight text-gray-900">Цена не указана</p>
      </div>
    );
  }

  return (
    <div className="mt-3">
      <h2 className="sr-only">Information about the product</h2>
      <p className="text-3xl tracking-tight text-gray-900">
        {new Intl.NumberFormat("ru-RU").format(price)} руб.
      </p>
    </div>
  );
};
export default PriceSection;
