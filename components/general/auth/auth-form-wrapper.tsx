import { cn } from "@/lib/utils";

interface AuthFormWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
}
const AuthFormWrapper: React.FC<AuthFormWrapperProps> = ({
  title,
  description,
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "rounded-xl border bg-card text-card-foreground shadow max-w-sm",
        className
      )}
    >
      <div className="flex flex-col p-4 space-y-1 sm:p-6">
        <div className="font-semibold tracking-tight text-2xl">{title}</div>
        <div className="text-sm text-muted-foreground">{description}</div>
      </div>
      <div className="p-4 pt-0 grid gap-4 sm:p-6 sm:pt-0">{children}</div>
    </div>
  );
};

export default AuthFormWrapper;
