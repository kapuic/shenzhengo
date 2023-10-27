import { twMerge } from "tailwind-merge";

export interface BaseCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * When used with a parent `<button>` or `<Link>` element, the parent element
   * must have the `group` class.
   */
  withButtonStyle?: boolean;
}

export default function BaseCard({
  withButtonStyle,
  className,
  children,
  ...props
}: BaseCardProps) {
  return (
    <div
      className={twMerge(
        "flex flex-col gap-1 rounded-xl border bg-white p-4 text-left shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:shadow-slate-700/[.7]",
        withButtonStyle &&
          "transition-all hover:bg-gray-50 group-focus:outline-none group-focus:ring-2 group-focus:ring-blue-500 group-focus:ring-offset-2 group-focus:ring-offset-white dark:hover:bg-gray-700 dark:group-focus:ring-offset-gray-900",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
