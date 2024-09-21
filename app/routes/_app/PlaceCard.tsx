import { useFeatureValue } from "@growthbook/growthbook-react";
import { IconMapPin } from "@tabler/icons-react";
import { type PolymorphicPropsWithoutRef } from "node_modules/react-polymorphic-types";
import { twMerge } from "tailwind-merge";
import { useMediaQuery } from "usehooks-ts";

import BaseCard, {
  type BaseCardDefaultElement,
  type BaseCardOwnProps,
} from "~/components/BaseCard";
import { categoryIcons } from "~/data/categories";
import { type Place } from "~/data/schema";

import { useAppLoaderData } from ".";

export interface PlaceCardOwnProps extends BaseCardOwnProps {
  place: Place;
  hideCategory?: boolean;
}

export type PlaceCardProps<
  T extends React.ElementType = typeof BaseCardDefaultElement,
> = PolymorphicPropsWithoutRef<PlaceCardOwnProps, T>;

export default function PlaceCard<
  T extends React.ElementType = typeof BaseCardDefaultElement,
>({ place, hideCategory, className, ...props }: PlaceCardProps<T>) {
  const variant = useFeatureValue<string>("place-card:variant", "colorful");

  const { categories } = useAppLoaderData();
  const Icon = categoryIcons[place.categoryId] ?? IconMapPin;
  const category = categories.find(({ id }) => id === place.categoryId);

  const darkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const shared = (
    <>
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-bold leading-tight text-gray-800 dark:text-gray-100">
          {place.name}
        </h3>
        {!hideCategory &&
          (variant === "lighting" || variant === "colorful" ? (
            <div className="flex items-center gap-1">
              <Icon
                className="h-4 w-4"
                style={{
                  stroke: darkMode
                    ? category?.colors.light
                    : category?.colors.dark,
                }}
              />
              <span
                className="text-sm font-medium"
                style={{
                  color: darkMode
                    ? category?.colors.light
                    : category?.colors.dark,
                }}
              >
                {category?.name ?? "Other"}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
              <Icon className="h-4 w-4" />
              <span className="text-sm">{category?.name ?? "Other"}</span>
            </div>
          ))}
      </div>
      {place.coverImage && (
        <img
          alt="Cover"
          className="h-16 w-16 rounded-full object-cover"
          src={place.coverImage}
        />
      )}
    </>
  );

  return (
    <div className="relative">
      <BaseCard
        style={{ backgroundColor: category?.colors.dark }}
        className={twMerge(
          "flex-row items-center justify-between blur-[6px]",
          variant !== "lighting" && "invisible",
          className,
        )}
        {...props}
      >
        {shared}
      </BaseCard>
      <BaseCard
        className={twMerge(
          "absolute inset-0 flex-row items-center justify-between opacity-95",
          className,
        )}
        {...props}
      >
        {shared}
      </BaseCard>
    </div>
  );
}
