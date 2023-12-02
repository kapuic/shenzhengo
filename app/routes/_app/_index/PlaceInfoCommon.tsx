import { useFeatureIsOn, useFeatureValue } from "@growthbook/growthbook-react";
import { Link } from "@remix-run/react";
import { IconMapPin, IconNavigation, IconUser } from "@tabler/icons-react";
import { isEqual } from "lodash";
import { twMerge } from "tailwind-merge";

import BaseCard from "~/components/BaseCard";
import { categoryIcons } from "~/data/categories";
import { type Place } from "~/data/schema";
import { getDirectionsUrl } from "~/utilities/amap";

import { useAppLoaderData } from "..";
import ActivityCard from "../ActivityCard";

export interface PlaceInfoCommonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  place: Place;
}

export default function PlaceInfoCommon({
  place,
  className,
  ...props
}: PlaceInfoCommonProps) {
  const { categories, activities } = useAppLoaderData();

  const enablePoiType = useFeatureIsOn("place-info:poi-type");
  const enableDirections = useFeatureIsOn("place-info:directions");
  const enableDescription = useFeatureIsOn("place-info:description");
  const enableSignatureDishes = useFeatureIsOn("place-info:signature-dishes");
  const enableGuides = useFeatureIsOn("place-info:guides");
  const enableAttribution = useFeatureIsOn("place-info:attribution");
  const signatureDishesLimit = useFeatureValue<number>(
    "place-info:signature-dishes:limit",
    3,
  );

  const Icon = categoryIcons[place.categoryId] ?? IconMapPin;
  const relevantActivities = activities.filter(
    (activity) =>
      activity.placeLocations?.some((location) =>
        isEqual(location, place.location),
      ) || activity.categoryIds?.includes(place.categoryId),
  );

  return (
    <div className={twMerge("flex flex-col gap-4", className)} {...props}>
      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-extrabold leading-tight text-gray-800 dark:text-gray-100">
          {place.name}
        </h3>
        <p
          className="text-xs font-medium text-gray-500 dark:text-gray-400"
          lang="zh_CN"
        >
          {place.originalName}
        </p>
        {enablePoiType && (
          <div className="flex items-center gap-1 text-gray-800 dark:text-gray-100">
            <Icon className="h-5 w-5" />
            <span>
              {categories.find(({ id }) => id === place.categoryId)?.name ??
                "Other"}
            </span>
          </div>
        )}
      </div>
      {enableDirections && (
        <Link
          className="focus-ring inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-blue-500 px-4 py-3 text-sm font-semibold text-gray-100 transition-all hover:bg-blue-600 dark:hover:bg-blue-400 dark:focus:ring-offset-gray-800"
          hrefLang="zh_CN"
          target="_blank"
          to={getDirectionsUrl(place).href}
        >
          <IconNavigation className="h-3.5 w-3.5" size={16} />
          Directions (Chinese)
        </Link>
      )}
      {enableDescription && place.description && (
        <div className="flex flex-col gap-1">
          <span className="font-semibold text-gray-800 dark:text-gray-100">
            Description
          </span>
          {/* `text-gray-600` is used in place of `text-gray-500` for readability. */}
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {place.description}
          </p>
        </div>
      )}
      {enableSignatureDishes && place.signatureDishes && (
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-gray-800 dark:text-gray-100">
            Signature Dishes
          </span>
          <div className="flex flex-col gap-2">
            {place.signatureDishes
              .slice(0, signatureDishesLimit)
              .map((dish, i) => (
                <BaseCard key={i} className="block h-24 columns-2 gap-0 p-0">
                  <img
                    alt="Signature Dish"
                    className="h-full w-full rounded-l-xl object-cover"
                    src={dish.image}
                  />
                  <div className="flex h-full flex-col justify-between p-2">
                    <div className="flex flex-col gap-1">
                      <span className="line-clamp-2 text-sm font-semibold leading-tight text-gray-800 dark:text-gray-100">
                        {dish.translation}
                      </span>
                      <span
                        className="line-clamp-1 text-xs text-gray-500 dark:text-gray-400"
                        lang="zh_CN"
                      >
                        {dish.name}
                      </span>
                    </div>
                    <span className="line-clamp-1 font-medium text-gray-800 dark:text-gray-100">
                      CN¥ {dish.price}
                    </span>
                  </div>
                </BaseCard>
              ))}
          </div>
        </div>
      )}
      {enableGuides && relevantActivities.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-gray-800 dark:text-gray-100">
            Guides
          </span>
          <div className="flex flex-col gap-2">
            {relevantActivities.map((activity, i) => (
              <ActivityCard
                key={i}
                withButtonStyle
                activity={activity}
                as={Link}
                className="group"
                to={`/guides/${activity.id}`}
              />
            ))}
          </div>
        </div>
      )}
      {enableAttribution && place.author && (
        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
          <IconUser size={18} />
          <span>Provided by {place.author}</span>
        </div>
      )}
    </div>
  );
}
