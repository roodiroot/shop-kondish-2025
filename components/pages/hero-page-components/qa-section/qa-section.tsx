import { Button } from "@/components/ui/button";

import QABlock from "./qa-block";
import BaseContainer from "@/components/general/containers/base-container";

import { QA } from "@/types/catalog";
import Link from "next/link";

interface QASectionProps {
  qaes?: QA[];
}

const QASection: React.FC<QASectionProps> = ({ qaes }) => {
  return (
    <BaseContainer className="mt-10 mb-20">
      <h2 className="text-2xl sm:text-3xl font-bold">
        Часто задаваемые вопросы
      </h2>
      <div className="mt-6 flex flex-col gap-y-6 md:flex-row md:gap-x-10">
        <div className="flex-1">
          <QABlock qaes={qaes} />
        </div>
        <div className="w-full md:max-w-xs">
          <div className="font-bold">Не нашли ответ на свой вопрос?</div>
          <div className="text-gray-400 mt-2 text-sm">
            Мы подготовили раздел с вопросами и ответами по всем направлениям
            работы нашего магазина. Там же вы сможете задать свой вопрос
          </div>
          <Button asChild className=" mt-2" size={"sm"} variant={"outline"}>
            <Link href={"/faq"}>Перейти в FAQ</Link>
          </Button>
        </div>
      </div>
    </BaseContainer>
  );
};

export default QASection;
