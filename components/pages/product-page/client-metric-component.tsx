"use client";

import { useEffect } from "react";
import { ProductMetrik, useEcommerce } from "@/hooks/use-ecommerce";

interface ClientMetrikComponentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  product: ProductMetrik;
}

const ClientMetrikComponent: React.FC<ClientMetrikComponentProps> = ({
  product,
}) => {
  const { viewProduct } = useEcommerce();

  useEffect(() => {
    viewProduct(product);
  }, []);

  return null;
};

export default ClientMetrikComponent;
