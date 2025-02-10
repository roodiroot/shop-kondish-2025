"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/use-media-query";
import useModalFilters from "@/hooks/use-modal-filters";

interface FiltersSheetWrapperProps
  extends React.HTMLAttributes<HTMLDivElement> {}
const FiltersSheetWrapper: React.FC<FiltersSheetWrapperProps> = ({
  children,
}) => {
  const { onClose, isOpen } = useModalFilters();
  const isDesctop = useMediaQuery("(min-width: 768px)");

  if (isDesctop) return null;

  return (
    <Sheet onOpenChange={() => onClose()} open={isOpen}>
      <SheetContent className="h-full flex flex-col p-4" side="bottom">
        <SheetTitle className="text-center">Фильтры</SheetTitle>
        <SheetDescription className="sr-only">
          Фильтры динамиеские товарного каталогач
        </SheetDescription>
        <div className="flex-1 overflow-auto">{children}</div>
      </SheetContent>
    </Sheet>
  );
};

export default FiltersSheetWrapper;
