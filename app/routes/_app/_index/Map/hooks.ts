import { useEffect } from "react";

import { type Place } from "~/data/schema";

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
