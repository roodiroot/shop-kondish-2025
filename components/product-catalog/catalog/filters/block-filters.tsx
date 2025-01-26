import { Filters } from "@/types/catalog";
import ItemBaseFilter from "./item-base-filter";
import OpenFilters from "../open-filters/open-filters";
import PriceFilter from "./price-filter";

interface BlockFiltersProps extends React.HTMLAttributes<HTMLDivElement> {
  filters?: Filters;
}
const BlockFilters: React.FC<BlockFiltersProps> = ({ filters }) => {
  // console.log("FILTERS");
  return (
    <aside>
      <h2 className="sr-only">Фильтры</h2>
      <div className="hidden md:block">
        {/* Открытые блоки фильтров */}
        <OpenFilters filters={filters} />

        {/* Все фильтры */}
        <div className="space-y-8 ">
          {filters &&
            Object.entries(filters).map(([key, { label, values }]) => {
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
      </div>
    </aside>
  );
};

export default BlockFilters;
