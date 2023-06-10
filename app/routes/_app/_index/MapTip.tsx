import { createCookie } from "@remix-run/cloudflare";
import { Form } from "@remix-run/react";
import { IconClick, IconMapPin, IconMouse } from "@tabler/icons-react";

import Alert from "~/components/Alert";
import Button from "~/components/Button";

export const mapTipCookie = createCookie("mapTipDismissed");

export default function MapTip() {
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
      <Form method="post">
        <Button type="submit">Do Not Show Again</Button>
      </Form>
    </Alert>
  );
}
