import { IconClick, IconMapPin, IconMouse } from "@tabler/icons-react";
import { useLocalStorage } from "usehooks-ts";

import Alert from "~/components/Alert";
import Button from "~/components/Button";

export default function MapWelcomeMessage() {
  const [, setWelcomeMessageDismissed] = useLocalStorage(
    "map.welcomeMessageDismissed",
    false,
  );

  return (
    <Alert className="flex-col gap-2" variant="dark">
      <div className="flex flex-col gap-2 text-sm">
        <span>
          Welcome to MeishaGo, a website that provides information for
          foreigners who travel around Dameisha. On the right is a map of
          Dameisha.
        </span>
        <ul className="flex flex-col gap-1 text-sm">
          <li className="flex gap-2">
            <IconMouse className="flex-shrink-0" />
            Drag and scroll or use keyboard to navigate the map.
          </li>
          <li className="flex gap-2">
            <IconMapPin className="flex-shrink-0" />
            Click a marker to see more information about that place.
          </li>
          <li className="flex gap-2">
            <IconClick className="flex-shrink-0" />
            Click a card below to focus on that place on the map.
          </li>
        </ul>
      </div>
      <Button
        className="focus:ring-offset-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-offset-gray-800"
        onClick={() => setWelcomeMessageDismissed(true)}
      >
        Do Not Show Again
      </Button>
    </Alert>
  );
}
