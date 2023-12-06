import { useFeatureIsOn } from "@growthbook/growthbook-react";
import { type MetaFunction } from "@remix-run/cloudflare";
import { useSearchParams } from "@remix-run/react";
import {
  IconExclamationCircle,
  IconMapPin,
  IconSearch,
} from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { lazy, Suspense, useId, useMemo, useState } from "react";
import { ClientOnly } from "remix-utils/client-only";
import { useHydrated } from "remix-utils/use-hydrated";
import { useEffectOnce, useLocalStorage } from "usehooks-ts";

import Alert from "~/components/Alert";
import Input from "~/components/Input";
import Spinner from "~/components/Spinner";
import TabSelect from "~/components/TabSelect";
import { categoryIcons } from "~/data/categories";
import { findLocation, isPlaceUnderCategory } from "~/utilities/data";
import {
  useHydratedEffect,
  useUpdateQueryStringValueWithoutNavigation,
} from "~/utilities/hooks";
import { mergeMeta } from "~/utilities/remix";
import { getFuseClient } from "~/utilities/search";

import { useAppLoaderData } from "..";
import { useAppMapContext } from "../AppMapContext";
import PlaceCard from "../PlaceCard";
import MapWelcomeMessage from "./MapWelcomeMessage";

const Map = lazy(() => import("./Map/Map"));

export const meta: MetaFunction = mergeMeta(() => [
  // { title: "Map | MeishaGo" },
]);

export default function Index() {
  const { ranges, categories, places } = useAppLoaderData();

  const enableWelcomeMessage = useFeatureIsOn("map-welcome-message");
  const enableZoomSwitch = useFeatureIsOn("zoom-switch");
  const enableLoadingMessage = useFeatureIsOn("map:loading-message");

  const { focus, setFocus } = useAppMapContext();

  // Focus to the place specified in the query string when the page loads.
  const [searchParams] = useSearchParams();
  const rawQueryLng = searchParams.get("lng");
  const queryLng = rawQueryLng ? parseFloat(rawQueryLng) : null;
  const rawQueryLat = searchParams.get("lat");
  const queryLat = rawQueryLat ? parseFloat(rawQueryLat) : null;
  const queryPlace =
    queryLng && queryLat
      ? findLocation(places, [queryLng, queryLat]) ?? null
      : null;
  useEffectOnce(() => setFocus(focus ?? queryPlace));

  // Update the query string when the focus changes.
  useUpdateQueryStringValueWithoutNavigation(
    "lng",
    focus?.location[0].toString() ?? "",
  );
  useUpdateQueryStringValueWithoutNavigation(
    "lat",
    focus?.location[1].toString() ?? "",
  );

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
    range ??= queryPlace?.rangeId;
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

  // Refocus to the corresponding center of the map when the range filter changes.
  const [willRecenterWhenFocusClears, setWillRecenterWhenFocusClears] =
    useState(false);
  useHydratedEffect(() => {
    if (!focus)
      return console.log(
        `Active tab changed to "${filterRange}". \`focus\` was null`,
      );
    console.log(
      `Active tab changed to "${filterRange}". Setting \`willRecenterWhenFocusClears\` to true and clearing \`focus\` (was `,
      focus,
      ")",
    );
    setWillRecenterWhenFocusClears(true);
    setFocus(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterRange]);

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

  // Implement the welcome message.
  const [welcomeMessageDismissed] = useLocalStorage(
    "map.welcomeMessageDismissed",
    false,
  );

  const hydrated = useHydrated();
  const placesLabelId = useId();

  return (
    <div className="flex h-full flex-grow flex-row">
      <aside className="hidden h-[calc(100dvh-4rem)] w-80 flex-shrink-0 flex-col overflow-y-scroll border-r bg-white px-4 py-6 dark:border-gray-700 dark:bg-gray-900 md:flex">
        <div className="flex flex-col gap-4">
          {enableWelcomeMessage && hydrated && !welcomeMessageDismissed && (
            <MapWelcomeMessage />
          )}
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
                  {/* <span
                    className="px-3 text-xs uppercase text-gray-500 dark:text-gray-400"
                    id={placesLabelId}
                  >
                    Categories
                  </span> */}
                  <div className="grid grid-cols-3 gap-4 px-4 py-2">
                    {recommendedCategories.slice(0, 6).map((type, i) => {
                      const Icon = categoryIcons[type.id] ?? IconMapPin;
                      return (
                        <div
                          key={i}
                          className="flex flex-col items-center gap-2"
                        >
                          <button
                            className="focus-ring rounded-full border bg-white p-4 text-gray-500 shadow-sm transition-all hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-100"
                            onClick={() =>
                              type.id === filterCategory
                                ? setFilterCategory(null)
                                : setFilterCategory(type.id)
                            }
                          >
                            <Icon size={36} />
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
                {!(filterCategory || filterSearch) && (
                  <span
                    className="px-3 text-xs uppercase text-gray-500 dark:text-gray-400"
                    id={placesLabelId}
                  >
                    {filterRange === "citywide"
                      ? "Citywide Places"
                      : "Nearby Places"}
                  </span>
                )}
                <ul
                  aria-labelledby={placesLabelId}
                  className="flex flex-col gap-3"
                >
                  {filteredPlaces.map((place, i) => (
                    <li key={i}>
                      <PlaceCard
                        withButtonStyle
                        as="button"
                        className="group w-full"
                        hideCategory={!!filterCategory}
                        place={place}
                        onClick={() => setFocus(place)}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </aside>
      <ClientOnly
        fallback={
          enableLoadingMessage && (
            <div className="grid h-full w-full place-items-center bg-white dark:bg-gray-900">
              <Alert className="delay-visible m-4 max-w-md" variant="dark">
                <Spinner
                  className="mr-3 inline h-5 w-5 flex-shrink-0"
                  size={20}
                />
                <div>
                  <span className="font-medium">
                    Waiting for the page to finish loading...
                  </span>{" "}
                  Your network seems to be slow. If this is taking too long,
                  check your network connection and try refreshing the page.
                  Check if JavaScript is enabled.
                </div>
              </Alert>
            </div>
          )
        }
      >
        {() => (
          <Suspense
            fallback={
              enableLoadingMessage && (
                <div className="grid h-full w-full place-items-center bg-white dark:bg-gray-900">
                  <Alert className="delay-visible m-4 max-w-md" variant="dark">
                    <Spinner
                      className="mr-3 inline h-5 w-5 flex-shrink-0"
                      size={20}
                    />
                    <div>
                      <span className="font-medium">
                        Waiting for the map to load...
                      </span>{" "}
                      Your network seems to be slow. If this is taking too long,
                      check your network connection and try refreshing the page.
                    </div>
                  </Alert>
                </div>
              )
            }
          >
            <div className="h-full w-full bg-white dark:bg-gray-900">
              <Map
                allPlaces={places}
                setWillRecenterWhenFocusClears={setWillRecenterWhenFocusClears}
                visiblePlaces={filteredPlaces}
                willRecenterWhenFocusClears={willRecenterWhenFocusClears}
                zoom={filterRange === "citywide" ? 11 : 15}
                zooms={[10, 18]}
              />
            </div>
          </Suspense>
        )}
      </ClientOnly>
    </div>
  );
}

export function ErrorBoundary() {
  return (
    <div className="grid h-full w-full place-items-center bg-white dark:bg-gray-900">
      <Alert className="m-4 max-w-md" variant="danger">
        <IconExclamationCircle
          className="mr-3 inline h-5 w-5 flex-shrink-0"
          size={20}
        />
        <div>
          <span className="font-medium">An error has occurred.</span> Please try
          refreshing the page or contact us if the problem persists.
        </div>
      </Alert>
    </div>
  );
}
