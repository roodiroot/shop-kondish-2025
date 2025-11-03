"use client";

import { Toaster } from "@/components/ui/sonner";
import { useMediaQuery } from "@/hooks/use-media-query";

const GeneralToaster = () => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  return <Toaster position={isDesktop ? "bottom-right" : "top-center"} />;
};

export default GeneralToaster;
