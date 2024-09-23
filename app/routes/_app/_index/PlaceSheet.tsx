import { useFeatureValue } from "@growthbook/growthbook-react";
import { IconChevronUp } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useMediaQuery } from "usehooks-ts";
import { Drawer } from "vaul";

import { useLastNonNullValue } from "~/utilities/hooks";

import { useAppMapContext } from "../AppMapContext";
import PlaceInfoCommon, {
  type PlaceInfoCommonShownElements,
} from "./PlaceInfoCommon";

export default function PlaceSheet() {
  const shownElements = useFeatureValue<PlaceInfoCommonShownElements>(
    "place-sheet-elements",
    [
      "header",
      "directions-button",
      "description",
      "signature-dishes",
      "related-activities",
      "author",
    ],
  );

  const { focus, setFocus } = useAppMapContext();
  const [activeSnapPoint, setActiveSnapPoint] = useState<
    string | number | null
  >(0.2);

  const hasMdScreenSize = useMediaQuery("(min-width: 768px)");
  const place = useLastNonNullValue(focus);

  const [showSwipeUp, setShowSwipeUp] = useState(false);
  useEffect(() => {
    if (!showSwipeUp) return;
    let timer: NodeJS.Timeout;
    timer = setTimeout(() => setShowSwipeUp(false), 2000);
    return () => clearTimeout(timer);
  }, [showSwipeUp]);
  useEffect(() => {
    if (!focus || activeSnapPoint !== 0.2) return setShowSwipeUp(false);
    let timer: NodeJS.Timeout;
    timer = setTimeout(() => setShowSwipeUp(activeSnapPoint === 0.2), 2000);
    return () => clearTimeout(timer);
  }, [focus, activeSnapPoint]);

  return !hasMdScreenSize ? (
    <Drawer.Root
      activeSnapPoint={activeSnapPoint}
      open={!!focus}
      setActiveSnapPoint={setActiveSnapPoint}
      snapPoints={[0.2, 0.5, 1]}
      onClose={() => setFocus(null)}
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-black/20" />
        <Drawer.Content className="fixed inset-x-0 bottom-0 z-50 -mx-[1px] flex h-full max-h-[95%] flex-col rounded-t-xl bg-white dark:bg-gray-800">
          <AnimatePresence mode="popLayout">
            {showSwipeUp && (
              <motion.div
                key="swipe-up"
                animate={{ opacity: 1 }}
                className="grid h-10 flex-shrink-0 place-items-center"
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
              >
                <div className="flex items-center gap-2 text-[#e2e2e4]">
                  <IconChevronUp stroke={4} />
                  <span className="text-sm font-medium">
                    Swipe Up to View Details
                  </span>
                </div>
              </motion.div>
            )}
            {!showSwipeUp && (
              <motion.div
                key="drawer-handle"
                animate={{ opacity: 1 }}
                className="grid h-10 flex-shrink-0 place-items-center"
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
              >
                <Drawer.Handle />
              </motion.div>
            )}
          </AnimatePresence>
          <div
            className={twMerge(
              "p-6 pt-0",
              activeSnapPoint === 1 && "!overflow-y-auto",
            )}
          >
            {place && (
              <PlaceInfoCommon place={place} shownElements={shownElements} />
            )}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  ) : null;
}
