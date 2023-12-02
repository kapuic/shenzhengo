import { isEqual } from "lodash";

import { type Category, type Place } from "~/data/schema";

export function findLocation(places: Place[], location: [number, number]) {
  return places.find((place) => isEqual(place.location, location));
}

export function isPlaceUnderCategory(
  place: Place,
  category: string,
  /**
   * Enable recursive mode: If `allCategories` is provided, it will be used to
   * check if `place` belongs to a child category of `category`.
   */
  allCategories?: Category[],
) {
  return (
    place.categoryId === category ||
    allCategories?.find(({ id }) => id === place.categoryId)?.parentId ===
      category
  );
}
