import { useFeatureIsOn, useFeatureValue } from "@growthbook/growthbook-react";
import { type MetaFunction } from "@remix-run/react";

import ErrorAlert from "~/components/ErrorAlert";
import { mergeMeta } from "~/utilities/remix";

import {
  useFilterCategory,
  useFilteredPlaces,
  useFilterRange,
  useFilterSearch,
  usePlacesInRange,
  usePlacesWithCoverImages,
  useRecommendedCategories,
} from "./hooks";
import SearchView, { type SearchViewShownElements } from "./SearchView";

export const meta: MetaFunction = mergeMeta(() => [
  { title: "Search | ShenzhenGo" },
]);

export default function SearchPage() {
  const prioritizeImageCards = useFeatureIsOn("prioritize-image-cards");
  const shownElements = useFeatureValue<SearchViewShownElements>(
    "search-page-elements",
    [
      ["search-bar", "range-tabs"],
      ["filter-message", "category-buttons", "places"],
    ],
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
    resetWhenChanged: [setFilterCategory, setFilterSearch],
  });

  const placesInRange = usePlacesInRange(filterRange);
  const filteredPlaces = useFilteredPlaces({
    places: placesInRange,
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
    <main className="h-full overflow-y-scroll px-4 py-6">
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
    </main>
  );
}

export const ErrorBoundary = ErrorAlert;
