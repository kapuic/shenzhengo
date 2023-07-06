import { useFeatureIsOn } from "@growthbook/growthbook-react";
import { InfoWindow, useMapContext } from "@uiw/react-amap";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useMediaQuery } from "usehooks-ts";

import { useAppMapContext } from "../AppMapContext";
import { type Place } from "../types";
import PlaceInfoCommon from "./PlaceInfoCommon";

// import PlacePopoverStyles from "./PlacePopover.css";

// export const links: LinksFunction = () => {
//   return [{ rel: "stylesheet", href: PlacePopoverStyles }];
// };

export default function PlacePopover() {
  const enableCoverImage = useFeatureIsOn("place-popover:cover-image");

  const { focus, setFocus } = useAppMapContext();

  // Disable map scroll wheel when `InfoWindow` is open.
  // This solves the conflict between map scroll and `InfoWindow` scroll.
  const { map } = useMapContext();
  // eslint-disable-next-line hooks/sort
  useEffect(() => {
    map?.setStatus({ scrollWheel: !focus });
  }, [focus, map]);

  // Prevent `InfoWindow` from re-rendering on close.
  // This solves the issue of `InfoWindow` moving before animation finishes.
  // eslint-disable-next-line hooks/sort
  const [cachedPlace, setCachedPlace] = useState<Place | null>(null);
  useEffect(() => {
    if (focus) setCachedPlace(focus);
  }, [focus]);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  return isDesktop ? (
    <InfoWindow
      isCustom
      visiable
      anchor="middle-left"
      offset={[20, -20]}
      position={cachedPlace?.location}
      onClose={() => setFocus(null)}
    >
      <AnimatePresence>
        {focus && (
          <motion.div
            animate={{ opacity: 1, transform: "scale(1)" }}
            className="pl-6"
            exit={{ opacity: 0, transform: `scale(.5)` }}
            initial={{ opacity: 0, transform: `scale(.5)` }}
            style={{ transformOrigin: "center left" }}
          >
            <div
              className={twMerge(
                "flex max-h-[30rem] w-80 snap-proximity flex-col overflow-x-hidden overflow-y-scroll rounded-xl border bg-white px-4 text-base shadow-sm backdrop-blur-xl supports-[backdrop-filter]:bg-opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:shadow-slate-700/[.7] dark:backdrop-blur-2xl supports-[backdrop-filter]:dark:bg-opacity-50"
                // "snap-y"
              )}
            >
              {enableCoverImage && focus.cover_image && (
                <img
                  alt="Cover"
                  className="-mx-4 h-32 snap-start rounded-t-xl object-cover"
                  src={focus.cover_image}
                />
              )}
              <PlaceInfoCommon className="snap-start pb-4 pt-4" place={focus} />
              <div className="snap-start" />
            </div>
            <div
              className="absolute left-0 top-[50%] -mt-3 h-6 w-6 bg-white shadow-sm backdrop-blur-xl supports-[backdrop-filter]:bg-opacity-75 dark:bg-gray-800 dark:shadow-slate-700/[.7] dark:backdrop-blur-2xl supports-[backdrop-filter]:dark:bg-opacity-75"
              style={{ clipPath: "polygon(25% 50%, 100% 100%, 100% 0)" }}
            />
            {/* Old, does not support setting background: <div className="absolute left-0 top-[50%] -mt-3 border-y-[12px] border-r-[12px] border-y-transparent border-r-white dark:border-r-gray-800" /> */}
          </motion.div>
        )}
      </AnimatePresence>
    </InfoWindow>
  ) : null;
}
