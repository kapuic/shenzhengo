import { useFeatureIsOn } from "@growthbook/growthbook-react";
import { Link } from "@remix-run/react";
import { IconMapPin, IconSearch, IconX } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { Fragment, type ReactNode, useId, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { useHydrated } from "remix-utils/use-hydrated";
import { twMerge } from "tailwind-merge";
import { useLocalStorage, useMediaQuery } from "usehooks-ts";

import Input from "~/components/Input";
import { categoryIcons } from "~/data/categories";
import { type Category, type Place } from "~/data/schema";
import { hexToRgba } from "~/utilities/ui";

import { useAppLoaderData } from "..";
import MapWelcomeMessage from "../_index/MapWelcomeMessage";
import PlaceCard from "../PlaceCard";
import RangeTabs from "../RangeTabs";

export type SearchViewElement =
  | "range-tabs"
  | "welcome-message"
  | "search-bar"
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
  setShowSearch?: (show: false) => void;
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
    ["range-tabs", "welcome-message", "search-bar"],
    ["filter-message", "category-buttons", "places"],
  ],
  setShowSearch,
}: SearchViewProps) {
  const enableUIRedesign = useFeatureIsOn("search:ui-redesign");
  const enableMapUIRedesign = useFeatureIsOn("map:ui-redesign");
  const { categories } = useAppLoaderData();

  const hydrated = useHydrated();

  /* eslint-disable hooks/sort */

  // `range-tabs`
  const [ref, hideShadow] = useInView();

  // `welcome-message`
  const [welcomeMessageDismissed] = useLocalStorage(
    "map.welcomeMessageDismissed",
    false,
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

  /* eslint-enable hooks/sort */

  const darkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const elements: Record<SearchViewElement, ReactNode> = {
    "range-tabs": (
      <Fragment key="range-tabs">
        <div
          className={twMerge(
            "sticky top-0 z-20 flex justify-center gap-2",
            enableMapUIRedesign && "md:sr-only md:focus-within:not-sr-only",
          )}
        >
          <RangeTabs
            filterRange={filterRange}
            setFilterRange={setFilterRange}
            className={twMerge(
              !hideShadow && "shadow-md dark:shadow-2xl dark:shadow-black",
            )}
          />
          {setShowSearch && (
            <button
              className={twMerge(
                "focus-ring inline-block rounded-lg bg-gray-100 p-2 text-gray-500 transition-all hover:bg-gray-200 md:hidden dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700",
                !hideShadow && "shadow-md dark:shadow-2xl dark:shadow-black",
              )}
              onClick={() => setShowSearch(false)}
            >
              <IconX />
            </button>
          )}
        </div>
        <div ref={ref} className="-mb-4"></div>
      </Fragment>
    ),
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
            return enableUIRedesign ? (
              <div key={i} className="group flex flex-col items-center gap-2">
                <div className="relative">
                  <div
                    aria-hidden
                    className="absolute inset-0 rounded-full border bg-white p-4 shadow-sm transition-all dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Icon
                      size={36}
                      style={{
                        stroke: darkMode
                          ? category.colors.dark
                          : category.colors.light,
                      }}
                    />
                  </div>
                  <button
                    className="rounded-full border bg-opacity-10 p-4 shadow-sm blur-md transition-all hocus:bg-opacity-30 hocus:blur-lg dark:border-gray-700"
                    id={`category-button__${category.id}`}
                    style={{
                      backgroundColor: hexToRgba(
                        category.colors.dark,
                        "var(--tw-bg-opacity)",
                      ),
                    }}
                    onClick={() =>
                      category.id === filterCategory
                        ? setFilterCategory(null)
                        : setFilterCategory(category.id)
                    }
                  >
                    <Icon size={36} style={{ stroke: category.colors.light }} />
                  </button>
                </div>
                <label
                  className="text-center text-sm font-medium text-gray-500 group-has-[button:focus]:text-gray-800 group-has-[button:hover]:text-gray-800 dark:text-gray-400 group-has-[button:focus]:dark:text-gray-100 group-has-[button:hover]:dark:text-gray-100"
                  htmlFor={`category-button__${category.id}`}
                >
                  {category.name}
                </label>
              </div>
            ) : (
              <div key={i} className="flex flex-col items-center gap-2">
                <button
                  className="focus-ring rounded-full border bg-white p-4 shadow-sm transition-all hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                  id={`category-button__${category.id}`}
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
                <label
                  className="text-center text-sm text-gray-800 dark:text-gray-100"
                  htmlFor={`category-button__${category.id}`}
                >
                  {category.name}
                </label>
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
                  onClick={() => {
                    setFocus(place);
                    setShowSearch?.(false);
                  }}
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
