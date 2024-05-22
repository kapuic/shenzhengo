import { twMerge } from "tailwind-merge";

export default function DropdownItem({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"a">) {
  return (
    <a
      role="menuitem"
      className={twMerge(
        "flex items-center gap-x-3.5 rounded-md px-3 py-2 text-sm transition-all hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-zinc-300 dark:hover:bg-zinc-700",
        className?.toString(),
      )}
      {...props}
    >
      {children}
    </a>
  );
}
