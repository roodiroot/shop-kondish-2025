"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ItemValue = ({
  label,
  value,
  handleCheckedChange,
  checked,
}: {
  label: string;
  value: string | null;
  handleCheckedChange: (checked: boolean, value: string | null) => void;
  checked: boolean;
}) => {
  if (!value) return null;
  return (
    <div className="flex items-center gap-3">
      <Checkbox
        checked={checked}
        onCheckedChange={(checked) =>
          handleCheckedChange(checked as boolean, value)
        }
        id={label}
      />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <label
              htmlFor={label}
              className="text-sm text-gray-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 line-clamp-2"
            >
              {value ? value : "Отсутствует"}
            </label>
          </TooltipTrigger>
          <TooltipContent>
            <p>{value ? value : "Отсутствует"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ItemValue;
