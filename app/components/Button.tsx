import { type PolymorphicPropsWithoutRef } from "node_modules/react-polymorphic-types";
import { twMerge } from "tailwind-merge";

export const ButtonDefaultElement = "button";

export interface ButtonOwnProps {
  size?: "sm" | "md" | "lg";
}

export type ButtonProps<
  T extends React.ElementType = typeof ButtonDefaultElement,
> = PolymorphicPropsWithoutRef<ButtonOwnProps, T>;

export default function Button<
  T extends React.ElementType = typeof ButtonDefaultElement,
>({ as, size, className, ...props }: ButtonProps<T>) {
  const Element: React.ElementType = as || ButtonDefaultElement;

  return (
    <Element
      className={twMerge(
        // From https://preline.co/docs/buttons.html#white-color-variants.
        "focus-ring inline-flex items-center justify-center gap-2 rounded-md border bg-white px-4 py-3 align-middle text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-800 dark:text-gray-400 dark:hover:bg-slate-700 dark:hover:text-white",
        size === "sm" && "px-3 py-2",
        size === "lg" && "px-5 py-4",
        className,
      )}
      {...props}
    />
  );
}
