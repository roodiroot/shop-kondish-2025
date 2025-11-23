"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import FeedbackForm from "./feedback-form";
import useFeedBack from "@/hooks/use-feedback";

const FeedBackSheet = () => {
  // const path = usePathname();
  // const router = useRouter();
  // const searchParams = useSearchParams();

  // const isOpen = searchParams.get("feedback") === "true";

  // const closeSheet = () => {
  //   const searchParam = new URLSearchParams(searchParams.toString());
  //   searchParam.delete("feedback");
  //   router.push(`${path}?${searchParam.toString()}`, { scroll: false });
  // };

  // if (!isOpen) return null;
  const { isOpen, close } = useFeedBack();

  return (
    <Sheet open={isOpen} onOpenChange={close}>
      <SheetContent side="right">
        <SheetHeader className="flex flex-col">
          <SheetTitle className="text-2xl font-bold">Обратная связь</SheetTitle>
          <SheetDescription
            style={{ marginTop: "0px" }}
            className="text-balance text-muted-foreground"
          >
            Добро пожаловать в Kondish!
          </SheetDescription>
        </SheetHeader>
        <FeedbackForm onCloseSheet={close} />
      </SheetContent>
    </Sheet>
  );
};

export default FeedBackSheet;
