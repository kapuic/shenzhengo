import { twMerge } from "tailwind-merge";

import { useDropdownContext } from ".";

export default function DropdownMenu({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const context = useDropdownContext();

  return (
    <div
      aria-labelledby={context.menuId}
      role="menu"
      className={twMerge(
        "absolute right-0 z-50 mt-2 min-w-[15rem] rounded-lg border bg-white p-2 shadow-md dark:border-zinc-700 dark:bg-zinc-800",
        className?.toString(),
      )}
      {...props}
    >
      {children}
    </div>
  );
}
