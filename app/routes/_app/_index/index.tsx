import {
  json,
  type LoaderArgs,
  type SerializeFrom,
  type V2_MetaFunction,
} from "@remix-run/cloudflare";
import {
  useLoaderData,
  useRouteLoaderData,
  useSearchParams,
} from "@remix-run/react";
import { IconExclamationCircle } from "@tabler/icons-react";
import { lazy, Suspense, useId, useState } from "react";
import { ClientOnly } from "remix-utils";
import { useEffectOnce } from "usehooks-ts";

import Alert from "~/components/Alert";
import Spinner from "~/components/Spinner";
import TabSelect, { type TabSelectTab } from "~/components/TabSelect";
import { PointOfInterestType } from "~/data/types";
import { getPlaceByLocation } from "~/utilities/data";
import {
  useHydratedEffect,
  useUpdateQueryStringValueWithoutNavigation,
} from "~/utilities/hooks";

import { type loader as appLoader } from "..";
import { useAppMapContext } from "../AppMapContext";
import PlaceCard from "../PlaceCard";
import MapTip, { mapTipCookie } from "./MapTip";

const Map = lazy(() => import("./Map/Map"));

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
  const { nearby: nearbyPlaces, citywide: citywidePlaces } = (
    useRouteLoaderData("routes/_app/index") as SerializeFrom<typeof appLoader>
  ).places;
  const allPlaces = [...nearbyPlaces, ...citywidePlaces];
  const { tipDismissed } = useLoaderData<typeof loader>();

  const { focus, setFocus } = useAppMapContext();

  const [searchParams] = useSearchParams();
  const rawQueryLng = searchParams.get("lng");
  const queryLng = rawQueryLng ? parseFloat(rawQueryLng) : null;
  const rawQueryLat = searchParams.get("lat");
  const queryLat = rawQueryLat ? parseFloat(rawQueryLat) : null;
  const queryPlace =
    queryLng && queryLat
      ? getPlaceByLocation([queryLng, queryLat]) ?? null
      : null;
  useEffectOnce(() => setFocus(focus ?? queryPlace));

  useUpdateQueryStringValueWithoutNavigation(
    "lng",
    focus?.location[0].toString() ?? ""
  );
  useUpdateQueryStringValueWithoutNavigation(
    "lat",
    focus?.location[1].toString() ?? ""
  );

  const tabs: TabSelectTab[] = [
    { id: "nearby", label: "Nearby" },
    { id: "citywide", label: "Citywide" },
  ];
  const [active, setActive] = useState("nearby");

  const [
    willChangeCenterWhenFocusChanges,
    setWillChangeCenterWhenFocusChanges,
  ] = useState(false);
  useHydratedEffect(() => {
    if (!focus)
      return console.log(
        `Active tab changed to "${active}". \`focus\` was null`
      );
    console.log(
      `Active tab changed to "${active}". Clearing \`focus\` (was `,
      focus,
      ") and settings `willChangeCenterWhenFocusChanges` to true"
    );
    setFocus(null);
    setWillChangeCenterWhenFocusChanges(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const pointsOfInterestLabelId = useId();

  return (
    <div className="flex flex-grow">
      <aside className="hidden md:block">
        <div className="flex h-[100dvh] w-72 flex-col overflow-y-auto border-r bg-white px-4 py-6 dark:border-gray-700 dark:bg-gray-900">
          <div className="flex flex-col gap-4">
            {!tipDismissed && <MapTip />}
            <div className="flex justify-center">
              <TabSelect active={active} setActive={setActive} tabs={tabs} />
            </div>
            {active === "citywide" ? (
              <div className="flex flex-col gap-3">
                <span
                  className="px-3 text-xs uppercase text-gray-500 dark:text-gray-400"
                  id={pointsOfInterestLabelId}
                >
                  Major Shopping Malls
                </span>
                <ul
                  aria-labelledby={pointsOfInterestLabelId}
                  className="flex flex-col gap-3"
                >
                  {citywidePlaces
                    .filter(
                      ({ type }) => type === PointOfInterestType.ShoppingMall
                    )
                    .map((place, i) => (
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
            ) : (
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
                  {nearbyPlaces.map((place, i) => (
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
            )}
          </div>
        </div>
      </aside>
      <ClientOnly
        fallback={
          <div className="grid h-full w-full place-items-center bg-white dark:bg-gray-900">
            <Alert className="delay-visible m-4 max-w-md" variant="dark">
              <Spinner
                className="mr-3 inline h-5 w-5 flex-shrink-0"
                size={20}
              />
              <div>
                <span className="font-medium">
                  Waiting for the page to finish loading...
                </span>{" "}
                Your network seems to be slow. If this is taking too long, check
                your network connection and try refreshing the page. Check if
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
                  <Spinner
                    className="mr-3 inline h-5 w-5 flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <span className="font-medium">
                      Waiting for the map to load...
                    </span>{" "}
                    Your network seems to be slow. If this is taking too long,
                    check your network connection and try refreshing the page.
                  </div>
                </Alert>
              </div>
            }
          >
            <div className="h-full w-full bg-white dark:bg-gray-900">
              <Map
                allPlaces={allPlaces}
                zoom={active === "citywide" ? 11 : 15}
                zooms={[10, 18]}
                setWillResetCenterWhenFocusClears={
                  setWillChangeCenterWhenFocusChanges
                }
                visiblePlaces={
                  active === "citywide" ? citywidePlaces : nearbyPlaces
                }
                willResetCenterWhenFocusClears={
                  willChangeCenterWhenFocusChanges
                }
              />
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
