"use client";

import { cn } from "@/lib/utils";

interface InputPhoneProps extends React.HTMLAttributes<HTMLInputElement> {
  value: string;
  setValue: (value: string) => void;
}

const InputPhone: React.FC<InputPhoneProps> = ({
  value,
  setValue,
  className,
}) => {
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement> & { nativeEvent: InputEvent }
  ) => {
    const input = event.target;
    let numbersValue = getNumbersValue(input);
    const selectionStart = input.selectionStart;

    if (!numbersValue) {
      setValue("");
      return;
    }

    if (input.value.length !== selectionStart) {
      const data = event.nativeEvent.data;
      if (!data?.match(/\D/g)) {
        setValue(input.value);
        return;
      }
      return;
    }

    let formattedValue = "";

    if (["7", "8", "9"].includes(numbersValue[0])) {
      if (numbersValue[0] === "9") {
        numbersValue = "7" + numbersValue;
      }
      const firstSymbol = numbersValue[0] === "8" ? "8" : "+7";
      formattedValue = firstSymbol + " ";

      if (numbersValue.length > 1) {
        formattedValue += "(" + numbersValue.substring(1, 4);
      }
      if (numbersValue.length >= 5) {
        formattedValue += ") " + numbersValue.substring(4, 7);
      }
      if (numbersValue.length >= 8) {
        formattedValue += "-" + numbersValue.substring(7, 9);
      }
      if (numbersValue.length >= 10) {
        formattedValue += "-" + numbersValue.substring(9, 11);
      }
    } else {
      formattedValue = "+" + numbersValue.substring(0, 16);
    }

    setValue(formattedValue);
  };

  return (
    <input
      maxLength={18}
      type="text"
      value={value}
      inputMode="tel"
      placeholder="8 (000) 000-00-00"
      onChange={handleInputChange}
      className={cn(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
    />
  );
};

const getNumbersValue = (input: HTMLInputElement) => {
  return input.value.replace(/\D/g, "");
};

export default InputPhone;
