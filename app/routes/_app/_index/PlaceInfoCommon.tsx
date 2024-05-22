import { Link } from "@remix-run/react";
import {
  IconEyePin,
  IconMapPin,
  IconNavigation,
  IconUser,
  IconUsers,
} from "@tabler/icons-react";
import { isEqual } from "lodash";
import { type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import BaseCard from "~/components/BaseCard";
import { categoryIcons } from "~/data/categories";
import { type Place } from "~/data/schema";
import { getDirectionsUrl } from "~/utilities/amap";
import { arrayToSentence } from "~/utilities/i18n";

import { useAppLoaderData } from "..";
import ActivityCard from "../ActivityCard";

export type PlaceInfoCommonElement =
  | "header"
  | "directions-button"
  | "street-view-button"
  | "description"
  | "signature-dishes"
  | "related-activities"
  | "author";

export type PlaceInfoCommonShownElements = PlaceInfoCommonElement[];

export interface PlaceInfoCommonProps
  extends React.ComponentPropsWithoutRef<"div"> {
  place: Place;
  shownElements?: PlaceInfoCommonShownElements;
}

export default function PlaceInfoCommon({
  place,
  shownElements = [
    "header",
    "directions-button",
    "street-view-button",
    "description",
    "signature-dishes",
    "related-activities",
    "author",
  ],
  className,
  ...props
}: PlaceInfoCommonProps) {
  const { categories, activities } = useAppLoaderData();

  const Icon = categoryIcons[place.categoryId] ?? IconMapPin;
  const relevantActivities = activities.filter(
    (activity) =>
      activity.placeLocations?.some((location) =>
        isEqual(location, place.location),
      ) || activity.categoryIds?.includes(place.categoryId),
  );

  const elements: Record<PlaceInfoCommonElement, ReactNode> = {
    header: (
      <div key="header" className="flex flex-col gap-1">
        <h3 className="text-xl font-extrabold leading-tight text-gray-800 dark:text-gray-100">
          {place.name}
        </h3>
        {place.originalName && (
          <p
            className="text-xs font-medium text-gray-500 dark:text-gray-400"
            lang="zh_CN"
          >
            {place.originalName}
          </p>
        )}
        <div className="flex items-center gap-1 text-gray-800 dark:text-gray-100">
          <Icon className="h-5 w-5" />
          <span>
            {categories.find(({ id }) => id === place.categoryId)?.name ??
              "Other"}
          </span>
        </div>
      </div>
    ),
    "directions-button": (
      <Link
        key="directions-button"
        className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg border border-transparent bg-blue-500 px-4 py-3 text-sm font-semibold text-gray-100 transition-all hover:bg-blue-600 disabled:pointer-events-none disabled:opacity-50 dark:hover:bg-blue-400 dark:focus:ring-offset-gray-800"
        hrefLang="zh_CN"
        target="_blank"
        to={getDirectionsUrl(place).href}
      >
        <IconNavigation className="h-3.5 w-3.5" size={16} />
        Directions (Chinese)
      </Link>
    ),
    "street-view-button": place.streetViewUrl && (
      <Link
        key="street-view-button"
        className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-sm transition-all hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800 dark:focus:ring-offset-gray-800"
        hrefLang="zh_CN"
        target="_blank"
        to={place.streetViewUrl}
      >
        <IconEyePin className="h-3.5 w-3.5" size={16} />
        Street View
      </Link>
    ),
    description: place.description && (
      <div key="description" className="flex flex-col gap-1">
        <span className="font-semibold text-gray-800 dark:text-gray-100">
          Description
        </span>
        {/* `text-gray-600` is used in place of `text-gray-500` for readability. */}
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {place.description}
        </p>
      </div>
    ),
    "signature-dishes": place.signatureDishes && (
      <div key="signature-dishes" className="flex flex-col gap-2">
        <span className="font-semibold text-gray-800 dark:text-gray-100">
          Signature Dishes
        </span>
        <div className="flex flex-col gap-2">
          {place.signatureDishes.slice(0, 2).map((dish, i) => (
            <BaseCard key={i} className="block h-24 columns-2 gap-0 p-0">
              <img
                alt="Signature Dish"
                className="h-full w-full rounded-l-xl object-cover"
                src={dish.image}
              />
              <div className="flex h-full flex-col justify-between p-2">
                <div className="flex flex-col gap-1">
                  <span className="line-clamp-2 text-sm font-semibold leading-tight text-gray-800 dark:text-gray-100">
                    {dish.name}
                  </span>
                  {dish.originalName && (
                    <span
                      className="line-clamp-1 text-xs text-gray-500 dark:text-gray-400"
                      lang="zh_CN"
                    >
                      {dish.originalName}
                    </span>
                  )}
                </div>
                {dish.price && (
                  <span className="line-clamp-1 font-medium text-gray-800 dark:text-gray-100">
                    CN¥ {dish.price}
                  </span>
                )}
              </div>
            </BaseCard>
          ))}
        </div>
      </div>
    ),
    "related-activities": relevantActivities.length > 0 && (
      <div key="related-activities" className="flex flex-col gap-2">
        <span className="font-semibold text-gray-800 dark:text-gray-100">
          Related Activities
        </span>
        <div className="flex flex-col gap-2">
          {relevantActivities.map((activity, i) => (
            <ActivityCard
              key={i}
              withButtonStyle
              activity={activity}
              as={Link}
              to={`/activities/${activity.id}`}
            />
          ))}
        </div>
      </div>
    ),
    author: place.authors && (
      <div
        key="author"
        className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400"
      >
        {typeof place.authors === "string" ? (
          <IconUser className="flex-shrink-0" size={18} />
        ) : (
          <IconUsers className="flex-shrink-0" size={18} />
        )}
        <span>Provided by {arrayToSentence(place.authors)}</span>
      </div>
    ),
  };

  return (
    <div className={twMerge("flex flex-col gap-4", className)} {...props}>
      {shownElements.map((element) => elements[element])}
    </div>
  );
}
