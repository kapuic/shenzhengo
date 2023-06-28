import { useEffect, useState } from "react";
import Sheet from "react-modal-sheet";
import { twMerge } from "tailwind-merge";
import { useMediaQuery } from "usehooks-ts";

import { useAppMapContext } from "../AppMapContext";
import PlaceInfoCommon from "./PlaceInfoCommon";

export default function PlaceSheet() {
  const { focus, setFocus } = useAppMapContext();
  const [opened, setOpened] = useState(false);
  const [expanded, setExpanded] = useState(false);

  /* eslint-disable hooks/sort */
  const isDesktop = useMediaQuery("(min-width: 768px)");
  useEffect(() => {
    if (!isDesktop) setOpened(!!focus);
    else setOpened(false);
  }, [isDesktop, opened, focus, setFocus]);
  /* eslint-enable hooks/sort */

  return !isDesktop ? (
    <Sheet
      initialSnap={1}
      isOpen={opened}
      snapPoints={[-50, 250, 0]}
      onClose={() => setFocus(null)}
      onSnap={(index) => setExpanded(index === 0)}
    >
      <Sheet.Container>
        <Sheet.Header className="bg-white dark:bg-gray-800" />
        <Sheet.Content className="bg-white p-4 dark:bg-gray-800">
          <Sheet.Scroller className={!expanded ? "!overflow-hidden" : ""}>
            {focus && <PlaceInfoCommon place={focus} />}
          </Sheet.Scroller>
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  ) : null;
}
