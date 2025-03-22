"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface FooterLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href: string;
  name: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, name, ...props }) => {
  const path = usePathname();
  return (
    <Link
      {...props}
      href={href}
      className={cn(
        "text-xs font-bold hover:text-primary",
        path === href ? "text-primary underline" : "text-gray-600"
      )}
    >
      {name}
    </Link>
  );
};

export default FooterLink;
