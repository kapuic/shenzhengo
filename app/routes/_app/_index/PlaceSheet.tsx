import { useEffect, useState } from "react";
import Sheet from "react-modal-sheet";
import { useMediaQuery } from "usehooks-ts";

import { useAppMapContext } from "../AppMapContext";
import PlaceInfoCommon from "./PlaceInfoCommon";

export default function PlaceSheet() {
  const { focus, setFocus } = useAppMapContext();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (!isDesktop) setOpened(!!focus);
    else setOpened(false);
  }, [isDesktop, opened, focus, setFocus]);

  return !isDesktop ? (
    <Sheet
      initialSnap={1}
      isOpen={opened}
      snapPoints={[-50, 250, 0]}
      onClose={() => setFocus(null)}
    >
      <Sheet.Container>
        <Sheet.Header className="bg-white dark:bg-gray-800" />
        <Sheet.Content className="bg-white p-4 dark:bg-gray-800">
          {focus && <PlaceInfoCommon place={focus} />}
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  ) : null;
}
