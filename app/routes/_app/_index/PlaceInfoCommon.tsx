import { Link } from "@remix-run/react";
import { IconNavigation, IconUser } from "@tabler/icons-react";
import { twMerge } from "tailwind-merge";

import BaseCard from "~/components/BaseCard";
import { getDirectionsUrl } from "~/utilities/amap";
import {
  getActivitiesByPlace,
  getPointOfInterestTypeIcon,
  getPointOfInterestTypeName,
} from "~/utilities/data";

import ActivityCard from "../ActivityCard";
import { type Place } from "../types";

export interface PlaceInfoCommonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  place: Place;
}

export default function PlaceInfoCommon({
  place,
  className,
  ...props
}: PlaceInfoCommonProps) {
  const Icon = getPointOfInterestTypeIcon(place.type);
  const activities = getActivitiesByPlace(place);

  return (
    <div className={twMerge("flex flex-col gap-4", className)} {...props}>
      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-extrabold leading-tight text-gray-800 dark:text-gray-100">
          {place.translation}
        </h3>
        <p
          className="text-xs font-medium text-gray-500 dark:text-gray-400"
          lang="zh_CN"
        >
          {place.name}
        </p>
        <div className="flex items-center gap-1 text-gray-800 dark:text-gray-100">
          <Icon />
          {getPointOfInterestTypeName(place.type)}
        </div>
      </div>
      <Link
        className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-blue-500 px-4 py-3 text-sm font-semibold text-gray-100 transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        hrefLang="zh_CN"
        target="_blank"
        to={getDirectionsUrl(place).href}
      >
        <IconNavigation className="h-3.5 w-3.5" size={16} />
        Directions (Chinese)
      </Link>
      {place.description && (
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
      {place.signature_dishes && (
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-gray-800 dark:text-gray-100">
            Signature Dishes
          </span>
          <div className="flex flex-col gap-2">
            {place.signature_dishes.map((dish, i) => (
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
      {activities.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-gray-800 dark:text-gray-100">
            Guides
          </span>
          <div className="flex flex-col gap-2">
            {activities.map((activity, i) => (
              <Link key={i} className="group" to={`/guides/${activity.id}`}>
                <ActivityCard withButtonStyle activity={activity} />
              </Link>
            ))}
          </div>
        </div>
      )}
      {place.author && (
        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
          <IconUser size={18} />
          <span>Provided by {place.author}</span>
        </div>
      )}
    </div>
  );
}
