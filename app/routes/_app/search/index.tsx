import { useFeatureValue } from "@growthbook/growthbook-react";
import { type MetaFunction, useSearchParams } from "@remix-run/react";
import { useMemo, useState } from "react";

import { isPlaceUnderCategory } from "~/utilities/data";
import {
  useHydratedEffect,
  useUpdateQueryStringValueWithoutNavigation,
} from "~/utilities/hooks";
import { mergeMeta } from "~/utilities/remix";
import { getFuseClient } from "~/utilities/search";

import { useAppLoaderData } from "..";
import SearchView, { type SearchViewShownElements } from "./SearchView";

export const meta: MetaFunction = mergeMeta(() => [
  { title: "Search | MeishaGo" },
]);

export default function SearchPage() {
  const shownElements = useFeatureValue<SearchViewShownElements>(
    "search-page-elements",
    [
      ["search-bar", "range-tabs"],
      ["filter-message", "category-buttons", "places"],
    ],
  );

  const { ranges, categories, places } = useAppLoaderData();
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

  return (
    <div className="px-4 py-6">
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
        shownElements={shownElements}
      />
    </div>
  );
}
