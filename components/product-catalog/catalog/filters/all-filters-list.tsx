import ItemBaseFilter from "./item-base-filter";
import PriceFilter from "./price-filter";

import { Filters } from "@/types/catalog";

interface AllFiltersListProps extends React.HTMLAttributes<HTMLDivElement> {
  filters?: Filters;
}

const AllFiltersList: React.FC<AllFiltersListProps> = ({ filters }) => {
  return (
    <div className="space-y-8 ">
      {filters &&
        Object.entries(filters)?.map(([key, { label, values }]) => {
          if (!values.length || values.length === 1) {
            return null;
          }
          if (key === "price") {
            return <PriceFilter key={key} values={values} />;
          }
          return (
            <ItemBaseFilter
              key={key}
              keyFilter={key}
              label={label}
              values={values}
            />
          );
        })}
    </div>
  );
};

export default AllFiltersList;
