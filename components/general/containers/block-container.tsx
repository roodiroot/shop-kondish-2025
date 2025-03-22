import { cn } from "@/lib/utils";
import BaseContainer from "./base-container";

const BlockContainer: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <BaseContainer
      className={cn(
        "mx-0 px-0 sm:px-0 max-w-none  lg:mx-auto lg:max-w-7xl w-full",
        className
      )}
      {...props}
    >
      <div className="bg-gray-100 w-full px-4 py-8 sm:px-6 lg:rounded-lg lg:px-14">
        {children}
      </div>
    </BaseContainer>
  );
};

export default BlockContainer;
