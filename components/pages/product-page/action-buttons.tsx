import { Button } from "@/components/ui/button";
import { HeartIcon } from "@heroicons/react/24/outline";

const ActionButtons = () => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row items-center mt-10">
      <Button size="lg">Добавить в корзину</Button>
      <Button className="text-gray-400" size="icon" variant="ghost">
        <HeartIcon className="min-w-6 min-h-6" />
      </Button>
    </div>
  );
};

export default ActionButtons;
