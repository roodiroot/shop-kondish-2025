"use client";

import useModal from "@/hooks/use-modal";
import AuthForm from "@/components/general/auth/auth-form";

import { Sheet, SheetContent } from "@/components/ui/sheet";

const AuthSheet = () => {
  const { isOpen, onClose } = useModal();
  return (
    <Sheet onOpenChange={() => onClose()} open={isOpen}>
      <SheetContent side="right">
        <AuthForm onCloseSheet={onClose} />
      </SheetContent>
    </Sheet>
  );
};

export default AuthSheet;
