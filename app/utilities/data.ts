import { isEqual } from "lodash";

import { type Category, type Place, type Range } from "~/data/schema";

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

export function checkRange(
  ranges: Range[],
  child: string,
  parent: string,
): boolean {
  if (child === parent) return true;
  const range = ranges.find(({ id }) => id === child);
  if (!range?.parentId) return false;
  const parentRange = ranges.find(({ id }) => id === range.parentId);
  if (!parentRange?.showChildren) return false;
  return checkRange(ranges, parentRange.id, parent);
}

export function getParentRanges(ranges: Range[], rangeId: string) {
  return ranges.filter(
    (range) => range.id !== rangeId && checkRange(ranges, rangeId, range.id),
  );
}
