import {
  json,
  type LoaderArgs,
  type SerializeFrom,
  type V2_MetaFunction,
} from "@remix-run/cloudflare";
import { useLoaderData, useRouteLoaderData } from "@remix-run/react";
import { IconExclamationCircle } from "@tabler/icons-react";
import { lazy, Suspense, useId } from "react";
import { ClientOnly } from "remix-utils";

import Alert from "~/components/ui/Alert";

import { type loader as appLoader } from "..";
import { useAppMapContext } from "../AppMapContext";
import MapTip, { mapTipCookie } from "./MapTip";
import PlaceCard from "./PlaceCard";

const Map = lazy(() => import("./Map"));

export const meta: V2_MetaFunction = () => {
  return [{ title: "Map | MeishaGo" }];
};

export async function loader({ request }: LoaderArgs) {
  const tipDismissed = (await mapTipCookie.parse(
    request.headers.get("Cookie")
  )) as true | null;
  return json({ tipDismissed });
}

export async function action() {
  return json(null, {
    headers: { "Set-Cookie": await mapTipCookie.serialize(true) },
  });
}

export default function Index() {
  const { places } = useRouteLoaderData("routes/_app/index") as SerializeFrom<
    typeof appLoader
  >;
  const { tipDismissed } = useLoaderData<typeof loader>();

  const { setFocus } = useAppMapContext();

  const pointsOfInterestLabelId = useId();

  return (
    <div className="flex flex-grow">
      <aside className="hidden md:block">
        <div className="flex h-[100dvh] w-72 flex-col overflow-y-auto border-r bg-white px-4 py-6 dark:border-gray-700 dark:bg-gray-900">
          <div className="flex flex-col gap-4">
            {!tipDismissed && <MapTip />}
            <div className="flex flex-col gap-3">
              <span
                className="px-3 text-xs uppercase text-gray-500 dark:text-gray-400"
                id={pointsOfInterestLabelId}
              >
                Points of Interest
              </span>
              <ul
                aria-labelledby={pointsOfInterestLabelId}
                className="flex flex-col gap-3"
              >
                {places.map((place, i) => (
                  <li key={i}>
                    <button
                      className="group w-full"
                      onClick={() => setFocus(place)}
                    >
                      <PlaceCard withButtonStyle place={place} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </aside>
      <ClientOnly
        fallback={
          <div className="grid h-full w-full place-items-center bg-white dark:bg-gray-900">
            <Alert className="delay-visible m-4 max-w-md" variant="dark">
              <div>
                <span className="font-medium">Loading map...</span> If this
                message does not disappear (and the map does not load), please
                try refreshing the page. Check your network connection and if
                JavaScript is enabled.
              </div>
            </Alert>
          </div>
        }
      >
        {() => (
          <Suspense
            fallback={
              <div className="grid h-full w-full place-items-center bg-white dark:bg-gray-900">
                <Alert className="delay-visible m-4 max-w-md" variant="dark">
                  <div>
                    <span className="font-medium">Loading map...</span> If this
                    message appears for too long, check your network connection
                    and refresh the page.
                  </div>
                </Alert>
              </div>
            }
          >
            <div className="h-full w-full bg-white dark:bg-gray-900">
              <Map places={places} />
            </div>
          </Suspense>
        )}
      </ClientOnly>
    </div>
  );
}

export function ErrorBoundary() {
  return (
    <div className="grid h-full w-full place-items-center bg-white dark:bg-gray-900">
      <Alert className="m-4 max-w-md" variant="danger">
        <IconExclamationCircle
          className="mr-3 inline h-5 w-5 flex-shrink-0"
          size={20}
        />
        <div>
          <span className="font-medium">An error has occurred.</span> Please try
          refreshing the page or contact us if the problem persists.
        </div>
      </Alert>
    </div>
  );
}
