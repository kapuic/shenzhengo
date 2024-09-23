import { useFeatureIsOn, useFeatureValue } from "@growthbook/growthbook-react";
import { type MetaFunction } from "@remix-run/cloudflare";
import { useSearchParams } from "@remix-run/react";
import { IconSearch } from "@tabler/icons-react";
import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { ClientOnly } from "remix-utils/client-only";
import { twMerge } from "tailwind-merge";
import { useMediaQuery } from "usehooks-ts";

import Alert from "~/components/Alert";
import ErrorAlert from "~/components/ErrorAlert";
import Spinner from "~/components/Spinner";
import { findLocation } from "~/utilities/data";
import {
  useEffectOnce,
  useUpdateQueryStringValueWithoutNavigation,
} from "~/utilities/hooks";
import { mergeMeta } from "~/utilities/remix";

import { useAppLoaderData } from "..";
import { useAppMapContext } from "../AppMapContext";
import RangeTabs from "../RangeTabs";
import {
  useFilterCategory,
  useFilteredPlaces,
  useFilterRange,
  useFilterSearch,
  usePlacesInRange,
  usePlacesWithCoverImages,
  useRecommendedCategories,
} from "../search/hooks";
import SearchView, { type SearchViewShownElements } from "../search/SearchView";

const Map = lazy(() => import("./Map/Map"));

export const meta: MetaFunction = mergeMeta(() => [
  // { title: "Map | ShenzhenGo" },
]);

export default function MapPage() {
  const enableUIRedesign = useFeatureIsOn("map:ui-redesign");
  const enableShowAllMarkers = useFeatureIsOn("map:all-markers");
  const prioritizeImageCards = useFeatureIsOn("prioritize-image-cards");
  const shownElements = useFeatureValue<SearchViewShownElements>(
    "search-panel-elements",
    enableUIRedesign
      ? [
          ["range-tabs", "welcome-message", "search-bar"],
          ["filter-message", "category-buttons", "places"],
        ]
      : [
          ["welcome-message", "search-bar", "range-tabs"],
          ["filter-message", "category-buttons", "places"],
        ],
  );

  const { ranges, places } = useAppLoaderData();
  const { focus, setFocus } = useAppMapContext();
  const [searchParams] = useSearchParams();

  // Focus to the place specified in the query string when the page loads.
  const rawQueryLng = searchParams.get("lng");
  const queryLng = rawQueryLng ? parseFloat(rawQueryLng) : null;
  const rawQueryLat = searchParams.get("lat");
  const queryLat = rawQueryLat ? parseFloat(rawQueryLat) : null;
  const queryPlace =
    queryLng && queryLat
      ? (findLocation(places, [queryLng, queryLat]) ?? null)
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

  const [filterCategory, setFilterCategory] = useFilterCategory();
  const [filterSearch, setFilterSearch] = useFilterSearch();
  const [filterRange, setFilterRange] = useFilterRange({
    queryPlace,
    resetWhenChanged: [setFilterCategory, setFilterSearch],
  });

  // Refocus to the corresponding center of the map when the range filter changes.
  const [willRecenterWhenFocusClears, setWillRecenterWhenFocusClears] =
    useState(false);
  useEffect(() => {
    if (!focus)
      return console.log(
        `[Map] Active range changed to "${filterRange}". \`focus\` was null`,
      );
    console.log(
      `[Map] Active range changed to "${filterRange}". Setting \`willRecenterWhenFocusClears\` to true and clearing \`focus\` (was `,
      focus,
      ")",
    );
    setWillRecenterWhenFocusClears(true);
    setFocus(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterRange]);

  const placesInRange = usePlacesInRange(filterRange);
  const filteredPlaces = useFilteredPlaces({
    places: placesInRange,
    filterCategory,
    filterSearch,
    prioritizeImageCards,
  });
  const displayedPlaces = useFilteredPlaces({
    places:
      !enableShowAllMarkers || filterCategory || filterSearch
        ? placesInRange
        : places,
    filterCategory,
    filterSearch,
    prioritizeImageCards,
  });
  const filteredPlacesWithCoverImages =
    usePlacesWithCoverImages(filteredPlaces);
  const recommendedCategories = useRecommendedCategories({
    filterCategory,
    filteredPlaces,
  });

  // eslint-disable-next-line hooks/sort
  const configuration = useMemo(() => {
    const range = ranges.find(({ id }) => id === filterRange);
    return {
      zoom: range?.zoom ?? 15,
      zooms: range?.zooms ?? [11, 18],
    };
  }, [ranges, filterRange]);

  // eslint-disable-next-line hooks/sort
  const [showSearch, setShowSearch] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  useEffect(() => {
    if (isDesktop) setShowSearch(false);
  }, [isDesktop]);

  return (
    <div className="relative flex h-full flex-grow flex-row">
      <aside
        className={twMerge(
          "hidden flex-shrink-0 overflow-y-scroll bg-white px-4 py-6 md:block md:w-80 md:border-r dark:border-gray-700 dark:bg-gray-900",
          showSearch && "absolute inset-0 z-20 block md:static md:z-auto",
        )}
      >
        <SearchView
          filterCategory={filterCategory}
          filterRange={filterRange}
          filterSearch={filterSearch}
          filteredPlaces={filteredPlaces}
          filteredPlacesWithCoverImages={filteredPlacesWithCoverImages}
          recommendedCategories={recommendedCategories}
          setFilterCategory={setFilterCategory}
          setFilterRange={setFilterRange}
          setFilterSearch={setFilterSearch}
          setFocus={setFocus}
          setShowSearch={setShowSearch}
          shownElements={shownElements}
        />
      </aside>
      <ClientOnly
        fallback={
          <div className="grid h-full w-full place-items-center bg-white dark:bg-gray-900">
            <Alert
              className="delay-visible m-4 max-w-md border-none"
              variant="dark"
            >
              <Spinner
                className="mr-3 inline h-5 w-5 flex-shrink-0"
                size={20}
              />
              <div className="flex flex-col gap-1.5">
                <span className="font-medium">
                  Waiting for the page to finish loading...
                </span>
                <p>
                  The page is taking too long to load. Please check your network
                  connection and try refreshing the page. JavaScript must be
                  enabled.
                </p>
              </div>
            </Alert>
          </div>
        }
      >
        {() => (
          <Suspense
            fallback={
              <div className="grid h-full w-full place-items-center bg-white dark:bg-gray-900">
                <Alert
                  className="delay-visible m-4 max-w-md border-none"
                  variant="dark"
                >
                  <Spinner
                    className="mr-3 inline h-5 w-5 flex-shrink-0"
                    size={20}
                  />
                  <div className="flex flex-col gap-1.5">
                    <span className="font-medium">
                      Waiting for the map to load...
                    </span>
                    <p>
                      The map is taking too long to load. Please check your
                      network connection and try refreshing the page.
                    </p>
                  </div>
                </Alert>
              </div>
            }
          >
            <main
              aria-label="Interactive visual map. Visually impaired users may browse the list of places or listen to guides instead."
              className="relative h-full w-full bg-white dark:bg-gray-900"
              role="application"
            >
              <Map
                allPlaces={places}
                filterRange={filterRange}
                filteredPlaces={filteredPlaces}
                setFilterRange={setFilterRange}
                setWillRecenterWhenFocusClears={setWillRecenterWhenFocusClears}
                visiblePlaces={displayedPlaces}
                willRecenterWhenFocusClears={willRecenterWhenFocusClears}
                zoom={configuration.zoom}
                zooms={configuration.zooms}
              />
              {enableUIRedesign && (
                <div className="absolute inset-x-0 top-0 flex flex-col items-center gap-2 py-6">
                  <div className="flex gap-2">
                    <RangeTabs
                      className="z-10 shadow-md dark:shadow-2xl dark:shadow-black"
                      filterRange={filterRange}
                      setFilterRange={setFilterRange}
                    />
                    <button
                      className="focus-ring z-10 inline-block rounded-lg bg-gray-100 p-2 text-gray-500 shadow-md transition-all hover:bg-gray-200 md:hidden dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                      onClick={() => setShowSearch(true)}
                    >
                      <IconSearch />
                    </button>
                  </div>
                </div>
              )}
            </main>
          </Suspense>
        )}
      </ClientOnly>
    </div>
  );
}

export function ErrorBoundary() {
  return (
    <ErrorAlert
      clientErrorMessage={
        <p>
          <span className="font-medium">
            Oops! Something went wrong with the map.
          </span>{" "}
          Please try refreshing the page and disabling any extensions or
          blockers. If the issue continues, feel free to contact our support
          team for assistance.
        </p>
      }
    />
  );
}
