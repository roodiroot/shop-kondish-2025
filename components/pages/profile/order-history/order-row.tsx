import Link from "next/link";

import { Button } from "@/components/ui/button";

interface OrderRowProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  price: number | null;
  count: number;
  slug: string;
}

const OrderRow: React.FC<OrderRowProps> = ({ name, price, count, slug }) => {
  return (
    <tr className="border-b last:border-0">
      <td className="py-4 pr-8">
        <div className="font-medium text-gray-900">{name}</div>
        <div className="mt-1 sm:hidden">
          {new Intl.NumberFormat("ru").format(price || 0)} р.
        </div>
      </td>
      <td className="py-4 pr-8 hidden sm:table-cell">
        {new Intl.NumberFormat("ru").format(price || 0)} р.
      </td>
      <td className="py-4 pr-8 hidden sm:table-cell">{count} шт.</td>
      <td className="py-4 whitespace-nowrap text-right font-medium">
        <Button asChild className="px-0" variant="link">
          <Link href={`/product/${slug}`}>Смотреть товар</Link>
        </Button>
      </td>
    </tr>
  );
};

export default OrderRow;
