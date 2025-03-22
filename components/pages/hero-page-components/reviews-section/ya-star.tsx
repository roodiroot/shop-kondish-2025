import { Icon } from "@/components/ui/icon";

const YaStar = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-center">
      <a
        target="_blank"
        href="https://yandex.ru/maps/org/kondish/223415694122/reviews"
      >
        <Icon.ya />
      </a>
      <div>
        <div className="flex items-center gap-2">
          <div className="text-base font-semibold text-gray-900">5,0</div>
          <div className="">
            <div className="flex gap-0.5">
              {new Array(5).fill(false).map((_, index) => (
                <Icon.star key={index} className="fill-[#fc0]" />
              ))}
            </div>
          </div>
        </div>
        <div className="text-xs mt-1">На основе 160 отзывов</div>
      </div>
    </div>
  );
};

export default YaStar;
