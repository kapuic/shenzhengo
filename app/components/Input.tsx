import { twMerge } from "tailwind-merge";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Input({ className, ...props }: InputProps) {
  // From https://preline.co/docs/input.html.
  return (
    <input
      type="text"
      className={twMerge(
        "focus-ring block w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-800 transition-all disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 md:text-sm",
        className,
      )}
      {...props}
    />
  );
}
