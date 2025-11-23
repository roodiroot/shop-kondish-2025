import BaseContainer from "@/components/general/containers/base-container";
import FButton from "@/components/general/fbutton";
import { Button } from "@/components/ui/button";

const FeedbackButtonSection = () => {
  return (
    <BaseContainer className="mb-20">
      <div className="w-full text-balance md:max-w-md md:mx-auto text-center px-6 sm:px-8">
        <div className="font-bold text-2xl">
          Не знаете, какой кондиционер подойдёт именно вам?
        </div>
        <div className="text-gray-400 mt-2 text-sm text-balance">
          Наши специалисты бесплатно помогут с подбором. Подскажем модель,
          рассчитаем монтаж и предложим лучшее решение под ваш бюджет.
        </div>
        <Button asChild className="font-bold w-full sm:w-auto mt-4">
          <FButton>Бесплатная консультация</FButton>
        </Button>
      </div>
    </BaseContainer>
  );
};

export default FeedbackButtonSection;
