import { cn } from "@/lib/utils";

type ProgressIndicatorProps = {
  active: boolean;
  duration?: number;
  onClick?: () => void;
};

const ProgressIndicator = ({ active, duration = 3000, onClick }: ProgressIndicatorProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-gray-200 w-6 h-0.5 rounded-lg relative overflow-hidden sm:h-[3px] sm:w-10"
    >
      <span
        style={{
          animationDuration: `${duration}ms`,
        }}
        className={cn("block h-full bg-gray-400", active ? "animate-progress" : "w-0")}
      ></span>
    </button>
  );
};

export default ProgressIndicator;
