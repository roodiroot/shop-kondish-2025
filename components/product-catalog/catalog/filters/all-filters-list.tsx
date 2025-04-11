import { FilterData } from "@/types/catalog";
import ItemBaseFilter from "./item-base-filter";
import PriceFilter from "./price-filter";
import FilterElementComplex from "./filter-element-complex";

interface AllFiltersListProps extends React.HTMLAttributes<HTMLDivElement> {
  filters?: FilterData | null;
}

const AllFiltersList: React.FC<AllFiltersListProps> = ({ filters }) => {
  return (
    <div className="space-y-8 ">
      {filters &&
        Object.entries(filters.complexFilters).map(
          ([key, { label, values }]) => {
            return (
              <FilterElementComplex
                key={key}
                label={label}
                values={values}
                filterKey={key}
              />
            );
          }
        )}
      {filters &&
        Object.entries(filters.simpleFilters)?.map(
          ([key, { label, values }]) => {
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
          }
        )}
    </div>
  );
};

export default AllFiltersList;
