import { twMerge } from "tailwind-merge";

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: number;
}

export default function Spinner({
  size = 5,
  className,
  ...props
}: SpinnerProps) {
  return (
    <span
      aria-label="Loading"
      role="status"
      className={twMerge(
        "inline-block animate-spin rounded-full border-[3px] border-current border-t-transparent",
        `h-${size} w-${size}`,
        className
      )}
      {...props}
    />
  );
}
