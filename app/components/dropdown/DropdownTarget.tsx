import { twMerge } from "tailwind-merge";

export default function DropdownTarget({
  children,
  className,
  ...props
}: JSX.IntrinsicElements["summary"]) {
  return (
    <summary
      tabIndex={-1}
      className={twMerge(
        "list-none group-open:before:fixed group-open:before:inset-0 group-open:before:z-40 group-open:before:cursor-pointer [&::-webkit-details-marker]:hidden",
        className?.toString(),
      )}
      {...props}
    >
      {children}
    </summary>
  );
}
