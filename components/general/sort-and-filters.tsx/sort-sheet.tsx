"use client";

import useModalSort from "@/hooks/use-modal-sort";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/use-media-query";
import SortVariantsList from "@/components/product-catalog/catalog/sort-and-filterls.tsx/sort-variants-list";

const SortSheet = () => {
  const { onClose, isOpen } = useModalSort();
  const isDesctop = useMediaQuery("(min-width: 768px)");

  if (isDesctop) return null;

  return (
    <Sheet onOpenChange={() => onClose()} open={isOpen}>
      <SheetContent side="bottom">
        <SheetTitle className="text-center">Сортировка</SheetTitle>
        <SheetDescription className="sr-only">
          Сортирована товарного каталога
        </SheetDescription>
        <div className="pb-4">
          <SortVariantsList onCloseModal={onClose} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SortSheet;
