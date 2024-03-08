import { useFeatureIsOn, useFeatureValue } from "@growthbook/growthbook-react";
import { type MetaFunction } from "@remix-run/cloudflare";
import { useSearchParams } from "@remix-run/react";
import { IconExclamationCircle } from "@tabler/icons-react";
import { lazy, Suspense, useState } from "react";
import { ClientOnly } from "remix-utils/client-only";

import Alert from "~/components/Alert";
import Spinner from "~/components/Spinner";
import { findLocation } from "~/utilities/data";
import {
  useEffectOnce,
  useHydratedEffect,
  useUpdateQueryStringValueWithoutNavigation,
} from "~/utilities/hooks";
import { mergeMeta } from "~/utilities/remix";

import { useAppLoaderData } from "..";
import { useAppMapContext } from "../AppMapContext";
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
  // { title: "Map | MeishaGo" },
]);

export default function MapPage() {
  const prioritizeImageCards = useFeatureIsOn("prioritize-image-cards");
  const shownElements = useFeatureValue<SearchViewShownElements>(
    "search-panel-elements",
    [
      ["welcome-message", "search-bar", "range-tabs"],
      ["filter-message", "category-buttons", "places"],
    ],
  );

  const { places } = useAppLoaderData();
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

  const [filterCategory, setFilterCategory] = useFilterCategory();
  const [filterSearch, setFilterSearch] = useFilterSearch();
  const [filterRange, setFilterRange] = useFilterRange({
    queryPlace,
    resetWhenChanged: [setFilterCategory, setFilterSearch],
  });

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

  const placesInRange = usePlacesInRange(filterRange);
  const filteredPlaces = useFilteredPlaces({
    placesInRange,
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

  return (
    <div className="flex h-full flex-grow flex-row">
      <aside className="hidden h-[calc(100dvh-4rem)] w-80 flex-shrink-0 flex-col overflow-y-scroll border-r bg-white px-4 py-6 md:flex dark:border-gray-700 dark:bg-gray-900">
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
