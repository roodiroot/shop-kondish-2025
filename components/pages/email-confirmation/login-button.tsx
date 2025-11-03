"use client";

import { Button } from "@/components/ui/button";
import useModal from "@/hooks/use-modal";

interface LoginButtonProps extends React.HTMLAttributes<HTMLButtonElement> {}

const LoginButton: React.FC<LoginButtonProps> = ({ ...props }) => {
  const { onOpen } = useModal();
  return (
    <Button variant={"secondary"} {...props} onClick={() => onOpen("LOGIN")}>
      Войти
    </Button>
  );
};

export default LoginButton;
