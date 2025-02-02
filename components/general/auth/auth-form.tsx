"use client";

import { useState } from "react";

import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import LoginForm from "@/components/general/auth/forms/login-form";
import RegisterForm from "@/components/general/auth/forms/register-form";

interface AuthFormProps {
  onCloseSheet?: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onCloseSheet }) => {
  const [form, setForm] = useState<"LOGIN" | "REGISTER">("LOGIN");

  switch (form) {
    case "LOGIN":
      return (
        <>
          <SheetHeader className="flex flex-col items-center text-center">
            <SheetTitle className="text-2xl font-bold">
              Авторизоваться
            </SheetTitle>
            <SheetDescription
              style={{ marginTop: "0px" }}
              className="text-balance text-muted-foreground"
            >
              Добро пожаловать в Kondish!
            </SheetDescription>
          </SheetHeader>
          <LoginForm switchForm={setForm} onCloseSheet={onCloseSheet} />
        </>
      );
    case "REGISTER":
      return (
        <>
          <SheetHeader className="flex flex-col items-center text-center">
            <SheetTitle className="text-2xl font-bold">
              Создайте аккаунт
            </SheetTitle>
            <SheetDescription
              style={{ marginTop: "0px" }}
              className="text-balance text-muted-foreground"
            >
              Добро пожаловать в Kondish!
            </SheetDescription>
          </SheetHeader>
          <RegisterForm switchForm={setForm} onCloseSheet={onCloseSheet} />
        </>
      );
    default:
      <div className=""></div>;
  }
};

export default AuthForm;
