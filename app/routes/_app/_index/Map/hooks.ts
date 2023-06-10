import { useEffect } from "react";

import { type Place } from "../../types";

/**
 * Change map center when `focus` changes.
 *
 * Does nothing when `focus` changes to null, except if
 * `willResetWhenFocusClears` is true, resets the center to default.
 */
export function useSetCenterWhenFocusChanges({
  focus,
  setCenter,
  willResetWhenFocusClears,
  setWillResetWhenFocusClears,
  defaultCenter,
  fitCenter,
}: {
  focus: Place | null;
  setCenter: (value: [number, number]) => void;
  willResetWhenFocusClears: boolean;
  setWillResetWhenFocusClears: (value: boolean) => void;
  defaultCenter: [number, number] | undefined;
  fitCenter: [number, number];
}) {
  useEffect(() => {
    if (!focus) {
      if (!willResetWhenFocusClears)
        return console.log("[Map] `focus` was cleared");
      console.log(
        `[Map] \`focus\` was cleared, but \`willChangeCenterWhenFocusChanges\` is true. Setting center to \`${
          defaultCenter ? "defaultCenter" : "fitCenter"
        }\` (`,
        defaultCenter ?? fitCenter,
        ")"
      );
      setCenter(defaultCenter ?? fitCenter);
      setWillResetWhenFocusClears(false);
      return;
    }
    console.log(
      "[Map] `focus` changed to",
      focus,
      ", setting center to",
      focus.location
    );
    setCenter(focus.location);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focus]);
}

/**
 * Reset map center when `defaultCenter` changes.
 *
 * Does nothing when `defaultCenter` is not set or when `focus` is set (often at
 * startup).
 */
export function useSetCenterWhenDefaultCenterChanges({
  defaultCenter,
  setCenter,
  focus,
}: {
  defaultCenter: [number, number] | undefined;
  setCenter: (value: [number, number]) => void;
  focus: Place | null;
}) {
  useEffect(() => {
    if (!defaultCenter || focus) return;
    console.log(
      "[Map] `defaultCenter` changed to",
      defaultCenter,
      ", resetting center to this new value"
    );
    setCenter(defaultCenter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultCenter]);
}

/**
 * Reset map center when `fitCenter` changes.
 *
 * Does nothing when `defaultCenter` is set or when `focus` is set (often at
 * startup).
 */
export function useSetCenterWhenFitCenterChanges({
  fitCenter,
  setCenter,
  defaultCenter,
  focus,
}: {
  fitCenter: [number, number];
  setCenter: (value: [number, number]) => void;
  defaultCenter: [number, number] | undefined;
  focus: Place | null;
}) {
  useEffect(() => {
    if (defaultCenter || focus) return;
    console.log(
      "[Map] `fitCenter` changed to",
      fitCenter,
      ", resetting center to this new value"
    );
    setCenter(fitCenter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fitCenter]);
}
