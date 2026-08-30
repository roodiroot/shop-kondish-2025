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
      className={cn(
        "bg-gray-200 rounded-lg relative overflow-hidden",
        active ? "w-6 h-1 sm:w-10" : "w-1.5",
      )}
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
