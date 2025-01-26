interface MainDescriptionProductSectionProps {
  description?: string | null;
  area_of_room?: string;
  compressor_type?: string;
  wifi_availability?: string;
  series?: string;
  warranty_period?: string;
  category?: string;
  brand?: string;
}
const MainDescriptionProductSection: React.FC<
  MainDescriptionProductSectionProps
> = ({
  description,
  area_of_room,
  compressor_type,
  series,
  warranty_period,
  category,
  brand,
}) => {
  const features = [
    { label: "Бренд производитель:", value: brand },
    { label: "Тип усстройства:", value: category },
    { label: "Серия:", value: series },
    { label: "Площадь помещения: м².", value: area_of_room },
    { label: "Тип компрессора:", value: compressor_type },
    { label: "Срок гарантии:", value: warranty_period },
  ];

  return (
    <div className="mt-6">
      <h3 className="sr-only">Описание</h3>
      <p className="text-gray-500">{description}</p>
      <dl className="text-sm mt-6">
        {features.map((feature, index) => {
          if (feature.value) {
            return (
              <div
                key={index}
                className="relative pl-1.5 my-2 pr-6 w-full flex gap-4 justify-between sm:pl-6 sm:before:top-1/2 sm:before:-translate-y-1/2 sm:before:absolute sm:before:left-2 sm:before:w-1 sm:before:h-1 sm:before:bg-slate-200"
              >
                <dt className="flex-1 leading-4 text-balance text-gray-500">
                  {feature.label}
                </dt>
                <dd className="text-gray-900 font-medium text-right leading-4">
                  {feature.value}
                </dd>
              </div>
            );
          }
        })}
      </dl>
    </div>
  );
};

export default MainDescriptionProductSection;
