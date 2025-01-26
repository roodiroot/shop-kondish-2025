import { cn } from "@/lib/utils";

const BaseContainer: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <main
      {...props}
      className={cn(
        "mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 md:max-w-7xl",
        className
      )}
    >
      {children}
    </main>
  );
};

export default BaseContainer;
