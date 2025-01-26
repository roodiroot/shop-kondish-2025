"use client";

import { ChevronDownIcon } from "@heroicons/react/24/outline";

interface SelectProps extends React.HTMLAttributes<HTMLDivElement> {
  productId?: number;
  disabled?: boolean;
  count?: number;
  setCount?: (productId: number, quantity: number) => void;
}

const Select: React.FC<SelectProps> = ({
  productId,
  disabled,
  count,
  setCount,
}) => {
  const selectCount = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (setCount && productId) {
      setCount(productId, Number(e.target.value));
    }
  };
  return (
    <div className="grid w-full max-w-16 grid-cols-1">
      <select
        disabled={disabled}
        className="col-start-1 peer row-start-1 appearance-none rounded-md disabled:bg-gray-50 bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline outline-1 outline-offset-1 outline-gray-300 sm:text-sm"
        name=""
        id=""
        value={count}
        onChange={(e) => selectCount(e)}
      >
        {new Array(100).fill("").map((_, index) => (
          <option key={index} value={index + 1}>
            {index + 1}
          </option>
        ))}
      </select>
      <ChevronDownIcon className="pointer-events-none col-start-1 row-start-1 mr-2 w-5 h-5 self-center justify-self-end text-gray-500 sm:w-4 sm:h-4 peer-disabled:text-gray-300" />
    </div>
  );
};

export default Select;
