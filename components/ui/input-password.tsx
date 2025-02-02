"use client";

import { useState } from "react";
import { Input } from "./input";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

interface InputPasswordProps extends React.HTMLAttributes<HTMLInputElement> {}

const InputPassword: React.FC<InputPasswordProps> = ({ ...props }) => {
  const [hide, setHide] = useState(true);
  return (
    <div className="relative">
      <Input {...props} type={hide ? "password" : "text"}></Input>
      <div
        onClick={() => setHide(!hide)}
        className="absolute text-gray-400 right-2 top-1/2 -translate-y-1/2 p-1 cursor-pointer"
      >
        {hide ? (
          <EyeIcon className=" w-5 h-5" />
        ) : (
          <EyeSlashIcon className="w-5 h-5" />
        )}
      </div>
    </div>
  );
};

export default InputPassword;
