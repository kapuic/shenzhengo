import { Link } from "@remix-run/react";
import { IconMapPin, IconNavigation, IconUser } from "@tabler/icons-react";
import { isEqual } from "lodash";
import { type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import BaseCard from "~/components/BaseCard";
import { categoryIcons } from "~/data/categories";
import { type Place } from "~/data/schema";
import { getDirectionsUrl } from "~/utilities/amap";

import { useAppLoaderData } from "..";
import GuideCard from "../GuideCard";

export type PlaceInfoCommonElement =
  | "header"
  | "directions-button"
  | "description"
  | "signature-dishes"
  | "related-guides"
  | "author";

export type PlaceInfoCommonShownElements = PlaceInfoCommonElement[];

export interface PlaceInfoCommonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  place: Place;
  shownElements?: PlaceInfoCommonShownElements;
}

export default function PlaceInfoCommon({
  place,
  shownElements = [
    "header",
    "directions-button",
    "description",
    "signature-dishes",
    "related-guides",
    "author",
  ],
  className,
  ...props
}: PlaceInfoCommonProps) {
  const { categories, guides } = useAppLoaderData();

  const Icon = categoryIcons[place.categoryId] ?? IconMapPin;
  const relevantGuides = guides.filter(
    (guide) =>
      guide.placeLocations?.some((location) =>
        isEqual(location, place.location),
      ) || guide.categoryIds?.includes(place.categoryId),
  );

  const elements: Record<PlaceInfoCommonElement, ReactNode> = {
    header: (
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
        className="focus-ring inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-blue-500 px-4 py-3 text-sm font-semibold text-gray-100 transition-all hover:bg-blue-600 dark:hover:bg-blue-400 dark:focus:ring-offset-gray-800"
        hrefLang="zh_CN"
        target="_blank"
        to={getDirectionsUrl(place).href}
      >
        <IconNavigation className="h-3.5 w-3.5" size={16} />
        Directions (Chinese)
      </Link>
    ),
    description: place.description && (
      <div className="flex flex-col gap-1">
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
      <div className="flex flex-col gap-2">
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
    ),
    "related-guides": relevantGuides.length > 0 && (
      <div className="flex flex-col gap-2">
        <span className="font-semibold text-gray-800 dark:text-gray-100">
          Related Guides
        </span>
        <div className="flex flex-col gap-2">
          {relevantGuides.map((guide, i) => (
            <GuideCard
              key={i}
              withButtonStyle
              as={Link}
              guide={guide}
              to={`/guides/${guide.id}`}
            />
          ))}
        </div>
      </div>
    ),
    author: place.author && (
      <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
        <IconUser size={18} />
        <span>Provided by {place.author}</span>
      </div>
    ),
  };

  return (
    <div className={twMerge("flex flex-col gap-4", className)} {...props}>
      {shownElements.map((element) => elements[element])}
    </div>
  );
}
