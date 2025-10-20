"use client";

import { LockClosedIcon, TrashIcon } from "@heroicons/react/24/solid";

interface TrashButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  productId?: string;
  disabled?: boolean;
  removeFromCart?: (productId: string) => void;
}
const TrashButton: React.FC<TrashButtonProps> = ({
  productId,
  removeFromCart,
  disabled,
}) => {
  return (
    <button
      onClick={() => {
        if (removeFromCart && productId) {
          removeFromCart(productId);
        }
      }}
      type="button"
      className="-m-2 inline-flex p-2 text-gray-400"
    >
      <span className="sr-only">Удалить</span>
      {disabled ? (
        <LockClosedIcon className="w-5 h-5" />
      ) : (
        <TrashIcon className="w-5 h-5" />
      )}
    </button>
  );
};

export default TrashButton;
