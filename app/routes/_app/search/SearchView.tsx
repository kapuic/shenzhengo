import { Link } from "@remix-run/react";
import { IconMapPin, IconSearch } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { type ReactNode, useId, useMemo, useState } from "react";
import { useHydrated } from "remix-utils/use-hydrated";
import { twMerge } from "tailwind-merge";
import { useLocalStorage } from "usehooks-ts";

import Input from "~/components/Input";
import TabSelect from "~/components/TabSelect";
import { categoryIcons } from "~/data/categories";
import { type Category, type Place } from "~/data/schema";
import { createPathWithSiblings, getDistanceFromRoot } from "~/utilities/tree";

import { useAppLoaderData } from "..";
import MapWelcomeMessage from "../_index/MapWelcomeMessage";
import PlaceCard from "../PlaceCard";

export type SearchViewElement =
  | "welcome-message"
  | "search-bar"
  | "range-tabs"
  | "filter-message"
  | "category-buttons"
  | "places";

export type SearchViewShownElements = [
  SearchViewElement[],
  SearchViewElement[],
];

export interface SearchViewProps {
  filterRange: string;
  setFilterRange: (range: string) => void;
  filterCategory: string | null;
  setFilterCategory: (category: string | null) => void;
  filterSearch: string | null;
  setFilterSearch: (search: string | null) => void;
  filteredPlaces: Place[];
  filteredPlacesWithCoverImages: Place[];
  recommendedCategories: Category[];
  setFocus?: (place: Place | null) => void;

  shownElements?: SearchViewShownElements;
}

export default function SearchView({
  filterRange,
  setFilterRange,
  filterCategory,
  setFilterCategory,
  filterSearch,
  setFilterSearch,
  filteredPlaces,
  filteredPlacesWithCoverImages,
  recommendedCategories,
  setFocus,

  shownElements = [
    ["welcome-message", "search-bar", "range-tabs"],
    ["filter-message", "category-buttons", "places"],
  ],
}: SearchViewProps) {
  const { ranges, categories } = useAppLoaderData();

  const hydrated = useHydrated();

  /* eslint-disable hooks/sort */

  // `welcome-message`
  const [welcomeMessageDismissed] = useLocalStorage(
    "map.welcomeMessageDismissed",
    false,
  );

  // `range-tabs`
  const filterDistance = useMemo(
    () => getDistanceFromRoot(ranges, filterRange),
    [ranges, filterRange],
  );

  const [lastDeepestRange, setLastDeepestRange] = useState(filterRange);
  const lastDeepestDistance = useMemo(
    () => getDistanceFromRoot(ranges, lastDeepestRange),
    [ranges, lastDeepestRange],
  );
  useMemo(() => {
    if (filterDistance >= lastDeepestDistance) setLastDeepestRange(filterRange);
  }, [filterDistance, lastDeepestDistance, filterRange]);

  const rangesPath = useMemo(
    () =>
      createPathWithSiblings(
        ranges.map(({ name, ...other }) => ({ label: name, ...other })),
        lastDeepestRange,
        true,
      ),
    [ranges, lastDeepestRange],
  );

  // `filter-message`
  const CurrentFilterIcon = useMemo(
    () => (filterCategory ? categoryIcons[filterCategory] : IconSearch),
    [filterCategory],
  );

  // `category-buttons`
  const categoriesLabelId = useId();

  // `places`
  const placesLabelId = useId();

  const elements: Record<SearchViewElement, ReactNode> = {
    "welcome-message": (
      <MapWelcomeMessage
        key="welcome-message"
        className={twMerge((!hydrated || welcomeMessageDismissed) && "hidden")}
      />
    ),
    "search-bar": (
      <div key="search-bar" className="relative">
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
    ),
    "range-tabs": (
      <div key="range-tabs" className="flex justify-center">
        <TabSelect
          active={filterRange ?? "nearby"}
          setActive={setFilterRange}
          tabs={rangesPath}
        />
      </div>
    ),
    "filter-message": (filterCategory || filterSearch) && (
      <div
        key="filter-message"
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
                ` in ${
                  categories.find(({ id }) => id === filterCategory)?.name
                }`}
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
    ),
    "category-buttons": recommendedCategories.length >= 3 && (
      <div key="category-buttons" className="flex flex-col gap-3">
        <span
          className="sr-only px-3 text-xs uppercase text-gray-500 dark:text-gray-400"
          id={categoriesLabelId}
        >
          Categories
        </span>
        <div
          aria-labelledby={categoriesLabelId}
          className="grid grid-cols-3 gap-4 px-4 py-2"
          role="group"
        >
          {recommendedCategories.slice(0, 6).map((category, i) => {
            const Icon = categoryIcons[category.id] ?? IconMapPin;
            return (
              <div key={i} className="flex flex-col items-center gap-2">
                <button
                  aria-labelledby={`category-label__${category.id}`}
                  className="focus-ring rounded-full border bg-white p-4 shadow-sm transition-all hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                  onClick={() =>
                    category.id === filterCategory
                      ? setFilterCategory(null)
                      : setFilterCategory(category.id)
                  }
                >
                  <Icon
                    className="text-gray-500 dark:text-gray-400"
                    size={36}
                  />
                </button>
                <span
                  className="text-center text-sm text-gray-800 dark:text-gray-100"
                  id={`category-label__${category.id}`}
                >
                  {category.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    ),
    places: (
      <div key="places" className="flex flex-col gap-3">
        <span
          id={placesLabelId}
          className={twMerge(
            "px-3 text-xs uppercase text-gray-500 dark:text-gray-400",
            (filterCategory || filterSearch) && "sr-only",
          )}
        >
          {filterCategory || filterSearch ? "Search Results" : "Browse Places"}
        </span>
        <ul aria-labelledby={placesLabelId} className="flex flex-col gap-3">
          {filteredPlaces.map((place, i) => (
            <li key={i}>
              {setFocus ? (
                <PlaceCard
                  withButtonStyle
                  as="button"
                  className="w-full"
                  hideCategory={filterCategory === place.categoryId}
                  place={place}
                  onClick={() => setFocus(place)}
                />
              ) : (
                <PlaceCard
                  withButtonStyle
                  as={Link}
                  className="w-full"
                  hideCategory={filterCategory === place.categoryId}
                  place={place}
                  to={`/?lng=${place.location[0]}&lat=${place.location[1]}`}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    ),
  };

  return (
    <div className="flex flex-col gap-4">
      {shownElements[0].map((element) => elements[element])}
      <AnimatePresence initial={false} mode="popLayout">
        <motion.div
          key={filterRange}
          animate={{ opacity: 1 }}
          className="flex flex-col gap-4"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
        >
          {shownElements[1].map((element) => elements[element])}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
