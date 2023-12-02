import { type PolymorphicPropsWithoutRef } from "node_modules/react-polymorphic-types";
import { twMerge } from "tailwind-merge";

import BaseCard, {
  type BaseCardDefaultElement,
  type BaseCardOwnProps,
} from "~/components/BaseCard";
import { type Place } from "~/data/schema";

export interface PlaceCardOwnProps extends BaseCardOwnProps {
  place: Place;
}

export type PlaceCardProps<
  T extends React.ElementType = typeof BaseCardDefaultElement,
> = PolymorphicPropsWithoutRef<PlaceCardOwnProps, T>;

export default function PlaceCard<
  T extends React.ElementType = typeof BaseCardDefaultElement,
>({ place, className, ...props }: PlaceCardProps<T>) {
  return (
    <BaseCard
      className={twMerge("flex-row items-center justify-between", className)}
      {...props}
    >
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-bold leading-tight text-gray-800 dark:text-gray-100">
          {place.name}
        </h3>
        <p
          className="text-xs font-medium text-gray-500 dark:text-gray-400"
          lang="zh_CN"
        >
          {place.originalName}
        </p>
      </div>
      {place.coverImage && (
        <img
          alt="Cover"
          className="h-16 w-16 rounded-full object-cover"
          src={place.coverImage}
        />
      )}
    </BaseCard>
  );
}
