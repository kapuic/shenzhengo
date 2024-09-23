import { useSearchParams } from "@remix-run/react";
import { useEffect, useMemo, useState } from "react";

import { DEFAULT_RANGE } from "~/consts";
import { type Place } from "~/data/schema";
import { checkRange, isPlaceUnderCategory } from "~/utilities/data";
import { useUpdateQueryStringValueWithoutNavigation } from "~/utilities/hooks";
import { getFuseClient } from "~/utilities/search";

import { useAppLoaderData } from "..";

export interface UseFilterRangesArgs {
  queryPlace?: Place | null;
  resetWhenChanged?: ((value: null) => void)[];
}

export function useFilterRange({
  queryPlace,
  resetWhenChanged,
}: UseFilterRangesArgs) {
  const { ranges } = useAppLoaderData();
  const [searchParams] = useSearchParams();
  const rawQueryFilterRange = searchParams.get("filter.range");
  const queryFilterRange = ranges.find(({ id }) => id === rawQueryFilterRange);
  function getInitialFilterRange() {
    let range = null;
    range ??= queryPlace?.rangeId;
    range ??= queryFilterRange?.id;
    range ??= DEFAULT_RANGE;
    return range;
  }
  const [filterRange, setFilterRange] = useState(getInitialFilterRange());
  useUpdateQueryStringValueWithoutNavigation(
    "filter.range",
    filterRange === DEFAULT_RANGE ? null : filterRange,
  );
  useEffect(
    () => resetWhenChanged?.forEach((reset) => reset(null)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filterRange],
  );
  return [filterRange, setFilterRange] as const;
}

export function useFilterCategory() {
  const { categories } = useAppLoaderData();
  const [searchParams] = useSearchParams();
  const rawQueryFilterCategory = searchParams.get("filter.category");
  const queryFilterCategory = categories.find(
    ({ id }) => id === rawQueryFilterCategory,
  );
  const [filterCategory, setFilterCategory] = useState(
    queryFilterCategory?.id ?? null,
  );
  useUpdateQueryStringValueWithoutNavigation("filter.category", filterCategory);
  return [filterCategory, setFilterCategory] as const;
}

export function useFilterSearch() {
  const [searchParams] = useSearchParams();
  const rawQuerySearch = searchParams.get("filter.search");
  const [filterSearch, setFilterSearch] = useState(rawQuerySearch);
  useUpdateQueryStringValueWithoutNavigation("filter.search", filterSearch);
  return [filterSearch, setFilterSearch] as const;
}

export function usePlacesInRange(range?: string | null) {
  const { ranges, places } = useAppLoaderData();
  return useMemo(
    () =>
      range
        ? places.filter(({ rangeId }) => checkRange(ranges, rangeId, range))
        : places,
    [ranges, places, range],
  );
}

export interface UseFilteredPlacesArgs {
  places: Place[];
  filterCategory?: string | null;
  filterSearch?: string | null;
  prioritizeImageCards?: boolean;
}

export function useFilteredPlaces({
  places,
  filterCategory,
  filterSearch,
  prioritizeImageCards,
}: UseFilteredPlacesArgs) {
  const { categories } = useAppLoaderData();
  return useMemo(() => {
    let results = places;
    if (filterCategory)
      results = results.filter((place) =>
        isPlaceUnderCategory(place, filterCategory, categories),
      );
    if (filterSearch)
      results = getFuseClient(results)
        .search(filterSearch)
        .map(({ item }) => item);
    if (prioritizeImageCards)
      results.sort((a, b) => {
        const aHasCoverImage = !!a.coverImage;
        const bHasCoverImage = !!b.coverImage;
        if (aHasCoverImage && !bHasCoverImage) return -1;
        if (!aHasCoverImage && bHasCoverImage) return 1;
        return 0;
      });
    return results;
  }, [categories, places, filterCategory, filterSearch, prioritizeImageCards]);
}

// export function useDeferredFilteredPlaces({
//   placesInRange,
//   filterCategory,
//   filterSearch,
//   prioritizeImageCards,
// }: UseFilteredPlacesArgs) {
//   const { categories } = useAppLoaderData();
//   const [asyncFilteredPlaces, setAsyncFilteredPlaces] = useState<Place[]>([]);
//   const filteredPlaces = useDeferredValue(asyncFilteredPlaces);

//   /* eslint-disable hooks/sort */
//   const [, startTransition] = useTransition();
//   useEffect(
//     () =>
//       startTransition(() => {
//         let results = placesInRange;
//         if (filterCategory)
//           results = results.filter((place) =>
//             isPlaceUnderCategory(place, filterCategory, categories),
//           );
//         if (filterSearch)
//           results = getFuseClient(results)
//             .search(filterSearch)
//             .map(({ item }) => item);
//         if (prioritizeImageCards)
//           results.sort((a, b) => {
//             const aHasCoverImage = !!a.coverImage;
//             const bHasCoverImage = !!b.coverImage;
//             if (aHasCoverImage && !bHasCoverImage) return -1;
//             if (!aHasCoverImage && bHasCoverImage) return 1;
//             return 0;
//           });
//         setAsyncFilteredPlaces(results);
//       }),
//     [
//       categories,
//       placesInRange,
//       filterCategory,
//       filterSearch,
//       prioritizeImageCards,
//     ],
//   );
//   /* eslint-disable hooks/sort */

//   return filteredPlaces;
// }

export function usePlacesWithCoverImages(places: Place[]) {
  return useMemo(() => places.filter(({ coverImage }) => coverImage), [places]);
}

export interface UseRecommendedCategoriesArgs {
  filterCategory?: string | null;
  filteredPlaces: Place[];
}

export function useRecommendedCategories({
  filterCategory,
  filteredPlaces,
}: UseRecommendedCategoriesArgs) {
  const { categories } = useAppLoaderData();

  return useMemo(
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
}
