import { type PolymorphicPropsWithoutRef } from "node_modules/react-polymorphic-types";
import { twMerge } from "tailwind-merge";

export const BaseCardDefaultElement = "div";

export interface BaseCardOwnProps {
  withButtonStyle?: boolean;
}

export type BaseCardProps<
  T extends React.ElementType = typeof BaseCardDefaultElement,
> = PolymorphicPropsWithoutRef<BaseCardOwnProps, T>;

export default function BaseCard<
  T extends React.ElementType = typeof BaseCardDefaultElement,
>({ as, withButtonStyle, className, ...props }: BaseCardProps<T>) {
  const Element = as || BaseCardDefaultElement;

  return (
    <Element
      className={twMerge(
        "flex flex-col gap-1 rounded-xl border bg-white p-4 text-left shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:shadow-slate-700/[.7]",
        withButtonStyle &&
          "focus-ring transition-all hover:bg-gray-50 dark:hover:bg-gray-700",
        className,
      )}
      {...props}
    />
  );
}
