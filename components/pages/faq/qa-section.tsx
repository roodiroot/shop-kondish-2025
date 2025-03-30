import { Button } from "@/components/ui/button";

import QABlock from "@/components/pages/hero-page-components/qa-section/qa-block";

import { QA } from "@/types/catalog";
import FButton from "@/components/general/fbutton";
import { Suspense } from "react";

interface QASectionProps {
  qaes?: QA[];
}

const QASectionForPageQA: React.FC<QASectionProps> = ({ qaes }) => {
  return (
    <div className="mb-10">
      <div className="mt-6 flex flex-col gap-y-6 md:flex-row md:gap-x-10">
        <div className="flex-1">
          <QABlock qaes={qaes} />
        </div>
        <div className="w-full md:max-w-xs">
          <div className="font-bold">Не нашли ответ на свой вопрос?</div>
          <div className="text-gray-400 mt-2 text-sm">
            Если вы не нашли ответа на свой вопрос, отправьте форму обратной
            связи. Наши специалисты с удовольствием перезвонят и помогут во всем
            разобратся.
          </div>
          <Suspense>
            <Button asChild className=" mt-4">
              <FButton>Помощь менеджера</FButton>
            </Button>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default QASectionForPageQA;
