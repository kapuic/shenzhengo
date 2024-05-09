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
    <Alert className="flex-col gap-3" variant="dark">
      <ul className="flex flex-col gap-2 text-sm">
        <li className="flex gap-2">
          <IconMouse className="flex-shrink-0" />
          <p>Drag and scroll or use your keyboard to navigate the map.</p>
        </li>
        <li className="flex gap-2">
          <IconMapPin className="flex-shrink-0" />
          <p>Click a pin to learn more about that place.</p>
        </li>
        <li className="flex gap-2">
          <IconClick className="flex-shrink-0" />
          <p>
            Click a card from the list below to focus on that place on the map.
          </p>
        </li>
      </ul>
      <Button
        className="focus:ring-offset-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-offset-gray-800"
        onClick={() => setWelcomeMessageDismissed(true)}
      >
        Do Not Show Again
      </Button>
    </Alert>
  );
}
