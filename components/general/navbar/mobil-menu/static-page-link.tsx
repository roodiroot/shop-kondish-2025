import Link from "next/link";
import PageSuplink from "./page-suplinks";
import { Page } from "@/navigation";

const StaticPageLink = ({
  page,
  closeDrawer,
}: {
  page: { name: string; pages?: Page[] | undefined; href?: string | undefined };
  closeDrawer: (value: boolean) => void;
}) => {
  if (page.href) {
    return (
      <li key={page.name} className="text-sm font-semibold text-white">
        <Link onClick={() => closeDrawer(false)} href={page.href}>
          {page.name}
        </Link>
      </li>
    );
  }

  if (page.pages?.length) {
    return <PageSuplink page={page} closeDrawer={closeDrawer} />;
  }

  return null;
};

export default StaticPageLink;
