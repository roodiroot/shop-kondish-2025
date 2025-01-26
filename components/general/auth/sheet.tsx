"use client";

import useModal from "@/hooks/use-modal";
import AuthForm from "@/components/general/auth/auth-form";
import { Sheet, SheetContent } from "@/components/ui/sheet";

export function SheetSide() {
  const { isOpen, onClose } = useModal();
  return (
    <div className="grid grid-cols-2 gap-2">
      <Sheet onOpenChange={() => onClose()} open={isOpen}>
        <SheetContent side="right">
          <AuthForm onCloseSheet={onClose} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
