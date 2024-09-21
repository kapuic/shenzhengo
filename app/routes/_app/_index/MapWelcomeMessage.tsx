import {
  IconArrowsMove,
  IconClick,
  IconHandClick,
  IconMapPin,
} from "@tabler/icons-react";
import { useHydrated } from "remix-utils/use-hydrated";
import { twMerge } from "tailwind-merge";
import { useLocalStorage, useMediaQuery } from "usehooks-ts";

import Alert, { type AlertProps } from "~/components/Alert";
import Button from "~/components/Button";

export default function MapWelcomeMessage({ className, ...props }: AlertProps) {
  const [, setWelcomeMessageDismissed] = useLocalStorage(
    "map.welcomeMessageDismissed",
    false,
  );
  const hydrated = useHydrated();
  const isTouchScreen = useMediaQuery("(hover: none), (pointer: coarse)");

  return (
    <Alert
      aria-hidden
      className={twMerge("flex-col gap-3", className)}
      variant="dark"
      {...props}
    >
      {hydrated && isTouchScreen ? (
        <ul className="flex flex-col gap-2 text-sm">
          <li className="flex gap-2">
            <IconArrowsMove className="flex-shrink-0" />
            <p>Drag to move, pinch to zoom.</p>
          </li>
          <li className="flex gap-2">
            <IconMapPin className="flex-shrink-0" />
            <p>Tap a pin to view the place's details.</p>
          </li>
          <li className="flex gap-2">
            <IconHandClick className="flex-shrink-0" />
            <p>
              Browse or search for places below. Tap on a place to view it on
              the map.
            </p>
          </li>
        </ul>
      ) : (
        <ul className="flex flex-col gap-2 text-sm">
          <li className="flex gap-2">
            <IconArrowsMove className="flex-shrink-0" />
            <p>
              Drag or use arrow keys to move, scroll or use - + keys to zoom.
            </p>
          </li>
          <li className="flex gap-2">
            <IconMapPin className="flex-shrink-0" />
            <p>Click a pin to view the place's details.</p>
          </li>
          <li className="flex gap-2">
            <IconClick className="flex-shrink-0" />
            <p>
              Browse or search for places below. Click on a place to view it on
              the map.
            </p>
          </li>
        </ul>
      )}
      <Button
        className="focus:ring-offset-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-offset-gray-800"
        tabIndex={-1}
        onClick={() => setWelcomeMessageDismissed(true)}
      >
        Do Not Show Again
      </Button>
    </Alert>
  );
}
