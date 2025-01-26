"use client";

import { Checkbox } from "@/components/ui/checkbox";

const ItemValue = ({
  label,
  value,
  handleCheckedChange,
  checked,
}: {
  label: string;
  value: string | null;
  handleCheckedChange: any;
  checked: boolean;
}) => {
  return (
    <div className="flex items-center gap-3">
      <Checkbox
        checked={checked}
        onCheckedChange={(checked) => handleCheckedChange(checked, value)}
        id={label}
      />
      <label
        htmlFor={label}
        className="text-sm text-gray-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {value ? value : "Отсутствует"}
      </label>
    </div>
  );
};

export default ItemValue;
