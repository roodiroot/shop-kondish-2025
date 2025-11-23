"use client";

import useFeedBack from "@/hooks/use-feedback";

interface FButtonProps extends React.HTMLAttributes<HTMLButtonElement> {}

const FButton: React.FC<FButtonProps> = ({ children, ...props }) => {
  const { open } = useFeedBack();
  // const router = useRouter();
  // const pathname = usePathname();
  // const searchParams = useSearchParams();

  // const updatedSearchParams = useMemo(() => {
  //   const params = new URLSearchParams(searchParams.toString());
  //   params.set("feedback", "true");
  //   return params.toString();
  // }, [searchParams]);

  // const handleOpenSheet = () => {
  //   router.push(`${pathname}?${updatedSearchParams}`, { scroll: false });
  // };

  return (
    <button {...props} type="button" onClick={open}>
      {children}
    </button>
  );
};

export default FButton;
