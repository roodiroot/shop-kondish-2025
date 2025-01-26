import { BanknotesIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

interface ChoicePayRadioProps extends React.HTMLAttributes<HTMLInputElement> {
  title: string;
  description: string;
  Icon: typeof BanknotesIcon;
  checked: boolean;
  onChange: () => void;
}
const ChoicePayRadio: React.FC<ChoicePayRadioProps> = ({
  title,
  description,
  Icon,
  checked,
  onChange,
}) => {
  return (
    <label className="relative flex cursor-pointer rounded-lg border border-gray-300 bg-white p-4 shadow-sm">
      <input
        type="radio"
        name="choice"
        className="hidden peer"
        checked={checked}
        onChange={onChange}
      />
      <span className="flex flex-1">
        <span className="flex flex-col">
          <span className="text-sm font-medium text-gray-900">{title}</span>
          <span className="text-sm flex items-center mt-1 text-gray-500">
            {description}
          </span>
          <span className="mt-6 text-sm font-medium text-gray-400">
            <Icon className="w-5 h-5" />
          </span>
        </span>
      </span>
      <CheckCircleIcon className="w-5 h-5 text-primary hidden peer-checked:block" />
      <span className="pointer-events-none z-10 absolute inset-[-1px] rounded-lg border-2 border-transparent peer-checked:border-primary"></span>
    </label>
  );
};

export default ChoicePayRadio;
