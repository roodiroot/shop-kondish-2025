const OrderHeaaderTable = () => {
  return (
    <thead className="sr-only text-left text-sm sm:not-sr-only">
      <tr>
        <th className="py-3 pr-8 sm:w-2/5 lg:w-1/3">Товар</th>
        <th className="hidden w-1/5 py-3 pr-8 sm:table-cell">Цена</th>
        <th className="hidden py-3 pr-8 sm:table-cell">Статус</th>
        <th className="w-0 py-3 text-right">Информация</th>
      </tr>
    </thead>
  );
};

export default OrderHeaaderTable;
