import { useFeatureIsOn } from "@growthbook/growthbook-react";
import { Link, type MetaFunction, useSearchParams } from "@remix-run/react";
import { IconMapPin, IconSearch } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { useId, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";

import Input from "~/components/Input";
import TabSelect from "~/components/TabSelect";
import { categoryIcons } from "~/data/categories";
import { isPlaceUnderCategory } from "~/utilities/data";
import {
  useHydratedEffect,
  useUpdateQueryStringValueWithoutNavigation,
} from "~/utilities/hooks";
import { mergeMeta } from "~/utilities/remix";
import { getFuseClient } from "~/utilities/search";

import { useAppLoaderData } from "..";
import PlaceCard from "../PlaceCard";

export const meta: MetaFunction = mergeMeta(() => [
  { title: "Search | MeishaGo" },
]);

export default function SearchPage() {
  const { ranges, categories, places } = useAppLoaderData();

  const enableZoomSwitch = useFeatureIsOn("zoom-switch");

  const [searchParams] = useSearchParams();

  //
  // This section of the code is responsible for implementing the filters.
  //
  // There are three filters in order:
  // - Range, which appears as a tab switcher between "Nearby" and "Citywide" places.
  // - Category, which appears as a grid of icons.
  // - Search, which appears as a text input.
  //

  // Implement the range filter.
  const rawQueryFilterRange = searchParams.get("filter.range");
  const queryFilterRange = ranges.find(({ id }) => id === rawQueryFilterRange);
  function getInitialFilterRange() {
    let range = null;
    range ??= queryFilterRange?.id;
    range ??= "nearby";
    return range;
  }
  const [filterRange, setFilterRange] = useState(getInitialFilterRange());
  useUpdateQueryStringValueWithoutNavigation(
    "filter.range",
    filterRange === "nearby" ? null : filterRange,
  );

  // Implement the category filter.
  const rawQueryFilterCategory = searchParams.get("filter.category");
  const queryFilterCategory = categories.find(
    ({ id }) => id === rawQueryFilterCategory,
  );
  const [filterCategory, setFilterCategory] = useState(
    queryFilterCategory?.id ?? null,
  );
  useUpdateQueryStringValueWithoutNavigation("filter.category", filterCategory);

  // Implement the search filter.
  const rawQuerySearch = searchParams.get("filter.search");
  const [filterSearch, setFilterSearch] = useState(rawQuerySearch);
  useUpdateQueryStringValueWithoutNavigation("filter.search", filterSearch);

  // Reset all filters when the range filter changes.
  useHydratedEffect(() => {
    setFilterCategory(null);
    setFilterSearch(null);
  }, [filterRange]);

  /** Places in active range. */
  const placesInRange = useMemo(
    () =>
      filterRange
        ? places.filter(({ rangeId }) => rangeId === filterRange)
        : places,
    [places, filterRange],
  );

  /** Places filtered by category and search in addition to range. */
  const filteredPlaces = useMemo(() => {
    let results = placesInRange;
    if (filterCategory)
      results = results.filter((place) =>
        isPlaceUnderCategory(place, filterCategory, categories),
      );
    if (filterSearch)
      results = getFuseClient(results)
        .search(filterSearch)
        .map(({ item }) => item);
    return results;
  }, [categories, placesInRange, filterCategory, filterSearch]);

  /** Filtered places that have cover images. */
  const filteredPlacesWithCoverImages = useMemo(
    () => filteredPlaces.filter(({ coverImage }) => coverImage),
    [filteredPlaces],
  );

  /** Categories that include filtered places. */
  const recommendedCategories = useMemo(
    () =>
      filterCategory
        ? []
        : categories.filter(
            ({ parentId, id }) =>
              !parentId &&
              filteredPlaces.some((place) =>
                isPlaceUnderCategory(place, id, categories),
              ),
          ),
    [categories, filterCategory, filteredPlaces],
  );

  // Implement the current filter icon.
  const CurrentFilterIcon = useMemo(
    () => (filterCategory ? categoryIcons[filterCategory] : IconSearch),
    [filterCategory],
  );

  const categoriesLabelId = useId();
  const placesLabelId = useId();

  return (
    <div className="px-4 py-6">
      <div className="flex flex-col gap-4">
        <div className="relative">
          <Input
            className="ps-11"
            placeholder="Search places..."
            value={filterSearch ?? ""}
            onChange={(e) => setFilterSearch(e.target.value)}
          />
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-4">
            <IconSearch className="h-4 w-4 text-gray-800 dark:text-gray-100" />
          </div>
        </div>
        {enableZoomSwitch && (
          <div className="flex justify-center">
            <TabSelect
              active={filterRange ?? "nearby"}
              setActive={setFilterRange}
              tabs={ranges.map(({ id, name }) => ({
                id,
                label: name,
              }))}
            />
          </div>
        )}
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={filterRange}
            animate={{ x: 0, opacity: 1 }}
            className="flex flex-col gap-4"
            transition={{ ease: [0.6, -0.05, 0.01, 0.99], duration: 0.3 }}
            exit={{
              x: filterRange === "citywide" ? "120%" : "-120%",
              opacity: 0.5,
            }}
            initial={{
              x: filterRange === "citywide" ? "120%" : "-120%",
              opacity: 0.5,
            }}
          >
            {(filterCategory || filterSearch) && (
              <div
                className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
                role="alert"
              >
                {filteredPlacesWithCoverImages.length >= 5 && (
                  <div className="flex justify-center -space-x-4">
                    <div className="inline-flex h-[3.875rem] w-[3.875rem] flex-shrink-0 items-center justify-center rounded-full bg-gray-100 ring-2 ring-gray-50 dark:bg-gray-700 dark:ring-gray-800">
                      <CurrentFilterIcon className="h-8 w-8 text-gray-800 dark:text-gray-100" />
                    </div>
                    {filteredPlacesWithCoverImages
                      .slice(0, 4)
                      .map(({ coverImage, name }, i) => (
                        <img
                          key={i}
                          alt={`Cover of ${name}`}
                          className="inline-block h-[3.875rem] w-[3.875rem] rounded-full ring-2 ring-gray-50 dark:ring-gray-800"
                          src={coverImage}
                        />
                      ))}
                  </div>
                )}
                <div className="flex gap-4">
                  {!(filteredPlacesWithCoverImages.length >= 5) && (
                    <CurrentFilterIcon className="h-5 w-5 flex-shrink-0" />
                  )}
                  <div className="flex flex-grow flex-col items-start gap-2">
                    <span>
                      <span className="font-bold">
                        Found {filteredPlaces.length} places
                      </span>
                      {filterCategory &&
                        ` in ${categories.find(
                          ({ id }) => id === filterCategory,
                        )?.name}`}
                      {filterSearch && ` matching "${filterSearch}"`}
                    </span>
                    {filterCategory && (
                      <button
                        className="focus-ring inline-flex items-center rounded-lg border border-transparent text-sm font-semibold text-blue-500 transition-all hover:text-blue-600 focus:ring-offset-4 focus:ring-offset-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:text-blue-400 dark:hover:text-blue-300 dark:focus:ring-offset-gray-800"
                        type="button"
                        onClick={() => setFilterCategory(null)}
                      >
                        Clear Category Filter
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
            {recommendedCategories.length >= 3 && (
              <div className="flex flex-col gap-3">
                <span
                  className="sr-only px-3 text-xs uppercase text-gray-500 dark:text-gray-400"
                  id={categoriesLabelId}
                >
                  Categories
                </span>
                <div
                  aria-labelledby={categoriesLabelId}
                  className="grid grid-cols-3 gap-4 px-4 py-2"
                >
                  {recommendedCategories.slice(0, 6).map((type, i) => {
                    const Icon = categoryIcons[type.id] ?? IconMapPin;
                    return (
                      <div key={i} className="flex flex-col items-center gap-2">
                        <button
                          className="focus-ring rounded-full border bg-white p-4 shadow-sm transition-all hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                          onClick={() =>
                            type.id === filterCategory
                              ? setFilterCategory(null)
                              : setFilterCategory(type.id)
                          }
                        >
                          <Icon
                            className="text-gray-500 dark:text-gray-400"
                            size={36}
                          />
                        </button>
                        <span className="text-center text-sm text-gray-800 dark:text-gray-100">
                          {type.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            <div className="flex flex-col gap-3">
              <span
                id={placesLabelId}
                className={twMerge(
                  "px-3 text-xs uppercase text-gray-500 dark:text-gray-400",
                  (filterCategory || filterSearch) && "sr-only",
                )}
              >
                {!(filterCategory || filterSearch)
                  ? filterRange === "citywide"
                    ? "Citywide Places"
                    : "Nearby Places"
                  : "Search Results"}
              </span>
              <ul
                aria-labelledby={placesLabelId}
                className="flex flex-col gap-3"
              >
                {filteredPlaces.map((place, i) => (
                  <li key={i}>
                    <PlaceCard
                      withButtonStyle
                      as={Link}
                      className="w-full"
                      hideCategory={filterCategory === place.categoryId}
                      place={place}
                      to={`/?lng=${place.location[0]}&lat=${place.location[1]}`}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
