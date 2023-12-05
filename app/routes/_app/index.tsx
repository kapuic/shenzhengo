import {
  getGrowthBookSSRData,
  type GrowthBookSSRData,
  useGrowthBookSSR,
} from "@growthbook/growthbook-react";
import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/cloudflare";
import { Outlet } from "@remix-run/react";
import {
  useLoaderData,
  useRouteLoaderData,
} from "@remix-run/react/dist/components";
import {
  IconBook,
  IconCloudRain,
  IconMap2,
  IconSearch,
  IconShare,
} from "@tabler/icons-react";
import { useState } from "react";
import { ClientOnly } from "remix-utils/client-only";

import activities from "~/data/activities";
import categories from "~/data/categories";
import places from "~/data/places";
import ranges from "~/data/ranges";
import { type Place } from "~/data/schema";

import AppMapContext from "./AppMapContext";
import Logo from "./Logo";
import NavButton from "./NavButton";

export const meta: MetaFunction = () => {
  return [
    { title: "MeishaGo" },
    {
      name: "description",
      content:
        "MeishaGo offers comprehensive information & lists of guides of local places/points of interest in Dameisha, located in Shenzhen, China, helping foreign residents and tourists.",
    },
  ];
};

export async function loader({ context }: LoaderFunctionArgs) {
  const featureCtlData = (await getGrowthBookSSRData({
    apiHost: context.env.GROWTHBOOK_API_HOST,
    clientKey: context.env.GROWTHBOOK_CLIENT_KEY,
    enableDevMode: process.env.NODE_ENV === "development",
  })) as unknown;

  return json({
    featureCtlData,
    ranges,
    categories,
    places,
    activities,
  });
}

export function useAppLoaderData() {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return useRouteLoaderData<typeof loader>("routes/_app/index")!;
}

export default function App() {
  const { featureCtlData, places } = useLoaderData<typeof loader>();
  useGrowthBookSSR(featureCtlData as unknown as GrowthBookSSRData);

  const [focus, setFocus] = useState<Place | null>(null);

  return (
    <AppMapContext.Provider value={{ focus, setFocus }}>
      <div className="flex flex-col">
        <header className="flex h-16 flex-row justify-between border-b px-4 py-2 dark:border-gray-700 dark:bg-gray-900">
          <div className="flex flex-row items-center gap-4">
            <Logo />
            <span className="hidden items-center rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400 sm:inline-flex">
              <span className="md:hidden">
                Explore {places.length}+ places across Dameisha
              </span>
              <span className="hidden md:block">
                Explore {places.length}+ different places and attractions across
                Dameisha
              </span>
            </span>
          </div>
          <div className="flex flex-row items-center gap-3">
            <ClientOnly>
              {() =>
                navigator.canShare?.() && (
                  <NavButton
                    to="/"
                    onClick={async (e) => {
                      e.preventDefault();
                      await navigator.share();
                    }}
                  >
                    <IconShare />
                  </NavButton>
                )
              }
            </ClientOnly>
            <NavButton
              target="_blank"
              to="https://www.qweather.com/en/weather/yantian-101280607.html"
            >
              <IconCloudRain />
            </NavButton>
          </div>
        </header>
        <div className="flex h-[calc(100dvh-4rem-4.5rem)] flex-grow flex-row md:h-[calc(100dvh-4rem)]">
          <aside className="z-10 hidden flex-shrink-0 flex-col items-center border-r bg-white px-4 py-6 dark:border-gray-700 dark:bg-gray-900 md:flex">
            <nav className="flex flex-col items-center gap-3">
              <NavButton to="/">
                <IconMap2 />
              </NavButton>
              <NavButton to="/guides">
                <IconBook />
              </NavButton>
            </nav>
            <div className="flex flex-col items-center gap-3">
              {/* <NavButton to="/improve">
                <IconPlus />
              </NavButton> */}
            </div>
          </aside>
          <div className="relative h-full w-full overflow-x-hidden overflow-y-scroll bg-white dark:bg-gray-900">
            <Outlet />
          </div>
        </div>
        <nav className="z-10 flex h-[4.5rem] flex-shrink-0 items-center justify-evenly border-t bg-white dark:border-t-gray-700 dark:bg-gray-900 md:hidden">
          <NavButton to="/">
            <IconMap2 />
          </NavButton>
          <NavButton to="/search">
            <IconSearch />
          </NavButton>
          <NavButton to="/guides">
            <IconBook />
          </NavButton>
        </nav>
      </div>
    </AppMapContext.Provider>
  );
}
