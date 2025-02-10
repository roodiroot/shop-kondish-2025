import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import ItemSlider from "./item-slider";

interface BaseItem {
  slug: string;
  name: string;
}

interface MenuCategoriesSliderProps<T extends BaseItem>
  extends React.HTMLAttributes<HTMLDivElement> {
  href: string;
  dataList: T[];
}
const MenuCategoriesSlider: React.FC<MenuCategoriesSliderProps<BaseItem>> = ({
  dataList,
  href,
}) => {
  return (
    <div className="md:overflow-hidden">
      <Carousel className="w-full py-4 sm:py-6">
        <CarouselContent className="-ml-1">
          {dataList.map((i, index) => (
            <CarouselItem key={index} className="pl-1 basis-1/2 md:basis-1/3">
              <div className="p-1">
                <ItemSlider title={i.name} href={`${href}/${i.slug}`} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default MenuCategoriesSlider;
