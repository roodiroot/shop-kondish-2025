import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface AccordionDescriptionProps {
  area_of_room?: string;
  energy_efficiency_class?: string;
  compressor_type?: string;
  noise_level?: string;
  wifi_availability?: string;
  series?: string;
  heating_power?: string;
  cooling_power?: string;
  country_of_manufacturer?: string;
  warranty_period?: string | null;
  refrigerant?: string | null;
  max_pipe_length?: string | null;
  cooling_capacity?: string | null;
  color?: string | null;
  category?: string | null;
  brand?: string | null;
  chars: { Title: string; description?: string }[];
}

const AccordionDescription: React.FC<AccordionDescriptionProps> = ({
  area_of_room,
  energy_efficiency_class,
  compressor_type,
  noise_level,
  wifi_availability,
  series,
  heating_power,
  cooling_power,
  country_of_manufacturer,
  warranty_period,
  refrigerant,
  max_pipe_length,
  cooling_capacity,
  color,
  category,
  brand,
  chars,
}) => {
  const features = [
    { label: "Площадь помещения: м².", value: area_of_room },
    { label: "Тип компрессора:", value: compressor_type },
    { label: "Энергоэффективность (класс):", value: energy_efficiency_class },
    { label: "Уровень шума: дБ.", value: noise_level },
    { label: "Наличие Wi-Fi:", value: wifi_availability },
    { label: "Мощность обогрева: кВт.", value: heating_power },
    { label: "Мощность охлаждения: кВт.", value: cooling_power },
    { label: "Хладагент:", value: refrigerant },
    { label: "Максимальная длина трубы: м.", value: max_pipe_length },
    { label: "Холодопроизводительность: кВт.", value: cooling_capacity },
    { label: "Цвет:", value: color },
    { label: "Бренд производитель:", value: brand },
    { label: "Тип устройства:", value: category },
    { label: "Серия:", value: series },
    { label: "Страна производства:", value: country_of_manufacturer },
    { label: "Срок гарантии:", value: warranty_period },
  ];
  return (
    <section className="mt-12">
      <h2 className="sr-only">Подробное описание</h2>
      <Accordion
        type="single"
        collapsible
        className="w-full border-t border-gray-200"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>Характеристики</AccordionTrigger>
          <AccordionContent>
            <dl className="">
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
              {chars.map((char, index) => {
                return (
                  <div
                    key={index}
                    className="relative pl-1.5 my-2 pr-6 w-full flex gap-4 justify-between sm:pl-6 sm:before:top-1/2 sm:before:-translate-y-1/2 sm:before:absolute sm:before:left-2 sm:before:w-1 sm:before:h-1 sm:before:bg-slate-200"
                  >
                    <dt className="flex-1 leading-4 text-balance text-gray-500">
                      {char.Title}
                    </dt>
                    <dd className="text-gray-900 font-medium text-right leading-4">
                      {char?.description}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Установка</AccordionTrigger>
          <AccordionContent className="text-gray-500">
            При установке кондиционера важно учитывать следующие условия и
            параметры:
            <br />
            <br />
            1. Оценка параметров и размеров жилья
            <br />
            2. Тип и модель кондиционера
            <br /> 3. Место установки внутреннего и внешнего блоков
            <br /> 4. Электропитание и безопасность
            <br />
            5. Вентиляционная система и дренаж
            <br />
            6. Учет закладываемых ресурсов
            <br />
            7. Соблюдение норм и стандартов
            <br />
            8. Качество монтажных работ
            <br />
            <br />
            <span className="text-gray-900">
              Закажите профессиональный замер для идеального подбора и
              правильного месторасположения вашего кондиционера.
            </span>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Условия оплаты</AccordionTrigger>
          <AccordionContent className="space-y-4 text-gray-500">
            <div>
              <div className="font-medium text-gray-900">1. Предоплата:</div>
              <div className="mt-2">
                Может потребоваться частичная предоплата за вызов мастера,
                которая впоследствии включается в общую стоимость установки.
              </div>
            </div>
            <div>
              <div className="font-medium text-gray-900">
                {" "}
                2. Оплата после замера:
              </div>
              <div className="mt-2">
                Окончательный расчет производится по факту выполнения замера и
                составления сметы.
              </div>
            </div>
            <div>
              <div className="font-medium text-gray-900">
                3. Способы оплаты:
              </div>
              <div className="mt-2">
                Принимаются различные способы оплаты, включая наличные,
                банковские карты, онлайн-переводы или безналичный расчет для
                юридических лиц.
              </div>
            </div>
            <div>
              <div className="font-medium text-gray-900">3. Рассрочка:</div>
              <div className="mt-2">
                Мы предлагаем удобную рассрочку на покупку кондиционеров: Без
                первоначального взноса Срок рассрочки от 3 до 9 месяцев.
                Оформите заявку на сайте или в нашем магазине и получите решение
                в течение одного дня. Наслаждайтесь комфортом с кондиционерами
                уже сегодня, оплачивая их постепенно!
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>Доставка</AccordionTrigger>
          <AccordionContent className="space-y-4 text-gray-500">
            <div>
              <div className="font-medium text-gray-900">
                Доставка в Москве:
              </div>
              <div className="mt-2  flex flex-col">
                <span>- Бесплатная доставка по Москве.</span>
                <span>
                  - Отсутствие минимальной суммы заказа для бесплатной доставки.
                </span>
              </div>
            </div>
            <div>
              <div className="font-medium text-gray-900">
                Доставка по Московской области:
              </div>
              <div className="mt-2  flex flex-col">
                <span>
                  - Стоимость доставки за пределами Москвы составляет 30 рублей
                  за каждый километр.
                </span>
                <span>
                  - Расчет стоимости доставки производится от границ города
                  Москвы, до адреса доставки.
                </span>
              </div>
            </div>
            <div>
              <div className="font-medium text-gray-900">
                Доставка по России:
              </div>
              <div className="mt-2  flex flex-col">
                <span>
                  - Мы сотрудничаем с рядом надежных транспортных компаний .
                </span>
                <span>
                  - Расчет стоимости доставки определяется тарифами выбранной
                  транспортной компании.
                </span>
              </div>
            </div>
            <div>
              <div className="font-medium text-gray-900">
                Планирование доставки:
              </div>
              <div className="mt-2 flex flex-col">
                <span>
                  - Возможность выбора удобной даты и времени доставки.
                </span>
                <span>
                  - Предварительное информирование клиента о времени доставки.
                </span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export default AccordionDescription;
