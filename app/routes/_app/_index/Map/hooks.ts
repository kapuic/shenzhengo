import { useEffect, useMemo } from "react";

import { type Place, type Range } from "~/data/schema";
import { getParentRanges } from "~/utilities/data";

interface CommonArgs {
  setCenter: (value: [number, number], causedByFocusCleared?: boolean) => void;
  focus: Place | null;
  defaultCenter?: [number, number];
}

/**
 * Calls `setCenter` to recenter the map view when `focus` changes.
 *
 * Subscribes to both of the following scenarios:
 *
 * - When `focus` is added or changed to a {@link Place}, recenters to
 *   `focus.location`.
 * - When `focus` is cleared to `null`, does nothing by default.
 *
 *   - However, if `willRecenterWhenFocusClears` is true, recenters to the default
 *       center (`defaultCenter` or `fitCenter`, in order) if present. Then,
 *       sets `willRecenterWhenFocusClears` to false if
 *       `setWillRecenterWhenFocusClears` is passed.
 */
export function useRecenterWhenFocusChanges({
  setCenter,
  focus,
  defaultCenter,
  fitCenter,
  willRecenterWhenFocusClears,
  setWillRecenterWhenFocusClears,
}: CommonArgs & {
  fitCenter?: [number, number] | null;
  willRecenterWhenFocusClears?: boolean;
  setWillRecenterWhenFocusClears?: (value: boolean) => void;
}) {
  useEffect(() => {
    if (focus) {
      console.log(
        "[Map] `focus` changed to",
        focus,
        ", setting center to",
        focus.location,
      );
      setCenter(focus.location, false);
    } else {
      if (!willRecenterWhenFocusClears)
        return console.log("[Map] `focus` was cleared");
      let fallbackCenter = defaultCenter ?? fitCenter;
      if (fallbackCenter) {
        console.log(
          `[Map] \`focus\` was cleared, but \`willRecenterWhenFocusClears\` is true. Setting center to \`${
            defaultCenter ? "defaultCenter" : "fitCenter"
          }\` (`,
          fallbackCenter,
          ")",
        );
        setCenter(fallbackCenter, true);
      }
      setWillRecenterWhenFocusClears?.(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focus]);
}

/**
 * Calls `setCenter` to recenter the map view when `defaultCenter` changes.
 *
 * Does nothing when:
 *
 * - `focus` is set, as it always has the highest priority.
 * - `defaultCenter` is not set or cleared to `null`.
 */
export function useRecenterWhenDefaultCenterChanges({
  setCenter,
  focus,
  defaultCenter,
}: CommonArgs) {
  useEffect(() => {
    if (focus || !defaultCenter) return;
    console.log(
      "[Map] `defaultCenter` changed to",
      defaultCenter,
      ", resetting center to this new value",
    );
    setCenter(defaultCenter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultCenter]);
}

/**
 * Calls `setCenter` to recenter the map view when `fitCenter` changes.
 *
 * Does nothing when:
 *
 * - `focus` is set, as it always has the highest priority.
 * - `defaultCenter` is set, as it always has a higher priority.
 * - `fitCenter` is not set or cleared to `null`.
 */
export function useRecenterWhenFitCenterChanges({
  setCenter,
  focus,
  defaultCenter,
  fitCenter,
}: CommonArgs & { fitCenter: [number, number] | null }) {
  useEffect(() => {
    if (focus || defaultCenter || !fitCenter) return;
    console.log(
      "[Map] `fitCenter` changed to",
      fitCenter,
      ", resetting center to this new value",
    );
    setCenter(fitCenter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fitCenter]);
}

export interface UseAutoSetRangeArgs {
  ranges: Range[];
  allPlaces: Place[];
  currentBounds: AMap.Bounds | null;
  focus?: Place | null;
  filterRange?: string;
  setFilterRange?: (rangeId: string) => void;
}

export function useAutoSetRange({
  ranges,
  allPlaces,
  currentBounds,
  focus,
  filterRange,
  setFilterRange,
}: UseAutoSetRangeArgs) {
  // Should move to `index.tsx` after upgrading to React 18.
  // TODO: Set default zoom for a place opened using query params.

  const placesInBounds = useMemo(
    () =>
      currentBounds
        ? allPlaces.filter(({ location }) => currentBounds.contains?.(location))
        : null,
    [allPlaces, currentBounds],
  );
  const rangeParentIds: Record<string, string[]> = useMemo(
    () =>
      Object.fromEntries(
        ranges.map(({ id }) => [
          id,
          getParentRanges(ranges, id).map(({ id }) => id),
        ]),
      ),
    [ranges],
  );
  const rangeCounts = useMemo(() => {
    if (!placesInBounds) return null;
    const results: Record<string, { self: number; asParent: number }> = {};
    for (const range of ranges) results[range.id] = { self: 0, asParent: 0 };
    for (const place of placesInBounds) {
      results[place.rangeId].self += 1;
      const parents = rangeParentIds[place.rangeId];
      for (const parent of parents) results[parent].asParent += 1;
    }
    return results;
  }, [ranges, rangeParentIds, placesInBounds]);
  const mostPossibleRange = useMemo(
    () =>
      rangeCounts
        ? Object.entries(rangeCounts).sort((a, b) => {
            const diff =
              b[1].self + b[1].asParent - (a[1].self + a[1].asParent);
            return diff === 0 ? b[1].self - a[1].self : diff;
          })[0][0]
        : null,
    [rangeCounts],
  );
  useEffect(() => {
    if (!mostPossibleRange || filterRange === mostPossibleRange || focus)
      return;
    console.log(
      `[Map] Detected user moving or zooming to range "${mostPossibleRange}"`,
    );
    setFilterRange?.(mostPossibleRange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mostPossibleRange, focus]);
}
