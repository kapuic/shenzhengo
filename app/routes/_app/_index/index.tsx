import { useFeatureValue } from "@growthbook/growthbook-react";
import { type MetaFunction } from "@remix-run/cloudflare";
import { useSearchParams } from "@remix-run/react";
import { IconExclamationCircle } from "@tabler/icons-react";
import { lazy, Suspense, useMemo, useState } from "react";
import { ClientOnly } from "remix-utils/client-only";
import { useEffectOnce } from "usehooks-ts";

import Alert from "~/components/Alert";
import Spinner from "~/components/Spinner";
import { findLocation, isPlaceUnderCategory } from "~/utilities/data";
import {
  useHydratedEffect,
  useUpdateQueryStringValueWithoutNavigation,
} from "~/utilities/hooks";
import { mergeMeta } from "~/utilities/remix";
import { getFuseClient } from "~/utilities/search";

import { useAppLoaderData } from "..";
import { useAppMapContext } from "../AppMapContext";
import SearchView, { type SearchViewShownElements } from "../search/SearchView";

const Map = lazy(() => import("./Map/Map"));

export const meta: MetaFunction = mergeMeta(() => [
  // { title: "Map | MeishaGo" },
]);

export default function MapPage() {
  const shownElements = useFeatureValue<SearchViewShownElements>(
    "search-panel-elements",
    [
      ["welcome-message", "search-bar", "range-tabs"],
      ["filter-message", "category-buttons", "places"],
    ],
  );

  const { ranges, categories, places } = useAppLoaderData();
  const { focus, setFocus } = useAppMapContext();
  const [searchParams] = useSearchParams();

  // Focus to the place specified in the query string when the page loads.
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

  return (
    <div className="flex h-full flex-grow flex-row">
      <aside className="hidden h-[calc(100dvh-4rem)] w-80 flex-shrink-0 flex-col overflow-y-scroll border-r bg-white px-4 py-6 dark:border-gray-700 dark:bg-gray-900 md:flex">
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
          shownElements={shownElements}
        />
      </aside>
      <ClientOnly
        fallback={
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
                Your network seems to be slow. If this is taking too long, check
                your network connection and try refreshing the page. Check if
                JavaScript is enabled.
              </div>
            </Alert>
          </div>
        }
      >
        {() => (
          <Suspense
            fallback={
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
