"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { useMediaQuery } from "@/hooks/use-media-query";
import BurgerMenu from "../burger-menu";
import BodyMobilMenu from "./body-mobil-menu";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { CatalogForNavbar } from "../navbar";
import { useState } from "react";

interface MobilMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  navigation: CatalogForNavbar;
}

const MobilMenu: React.FC<MobilMenuProps> = ({ navigation }) => {
  const isDesctop = useMediaQuery("(min-width: 1024px)");
  const [open, setOpen] = useState(false);

  return isDesctop ? (
    <span className="sr-only">Menu</span>
  ) : (
    <Drawer direction="left" open={open} onOpenChange={(e) => setOpen(e)}>
      <DrawerTrigger>
        <BurgerMenu />
      </DrawerTrigger>
      <DrawerContent className="bg-primary">
        <DrawerTitle className="sr-only">Mobil menu</DrawerTitle>
        <DrawerDescription className="sr-only">Mobil menu</DrawerDescription>
        <DrawerClose className="absolute z-10 right-1 top-1.5 p-3">
          <XMarkIcon className="w-6 h-6 text-white" />
        </DrawerClose>
        <BodyMobilMenu navigation={navigation} closeDrawer={setOpen} />
      </DrawerContent>
    </Drawer>
  );
};

export default MobilMenu;
