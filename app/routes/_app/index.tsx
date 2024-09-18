import { json, type MetaFunction } from "@remix-run/cloudflare";
import { Outlet } from "@remix-run/react";
import {
  Link,
  useLoaderData,
  useMatches,
  useRouteLoaderData,
} from "@remix-run/react/dist/components";
import {
  IconChevronLeft,
  IconCloudRain,
  IconExternalLink,
  IconInfoCircle,
  IconMap2,
  IconRun,
  IconSearch,
  IconShare,
} from "@tabler/icons-react";
import { useMemo, useState } from "react";
import { useHydrated } from "remix-utils/use-hydrated";
import { twMerge } from "tailwind-merge";

import Button from "~/components/Button";
import ErrorAlert from "~/components/ErrorAlert";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/Tooltip";
import activities from "~/data/activities";
import categories from "~/data/categories";
import places from "~/data/places";
import ranges from "~/data/ranges";
import { type Place } from "~/data/schema";
import { mergeMeta, type RouteHandle } from "~/utilities/remix";

import Logo from "../../components/Logo";
import AboutDialog from "./AboutDialog";
import AppMapContext from "./AppMapContext";
import NavButton from "./NavButton";

export const meta: MetaFunction<typeof loader> = mergeMeta(({ data }) => [
  { title: "ShenzhenGo - Map of Shenzhen for Foreigners" },
  {
    name: "description",
    content: `ShenzhenGo offers detailed information & guides of ${data?.places.length}+ places and attractions in Shenzhen, China for foreign tourists and residents.`,
  },
  { name: "color-scheme", content: "light dark" },
]);

export async function loader() {
  return json({
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
  const { places } = useLoaderData<typeof loader>();

  const [focus, setFocus] = useState<Place | null>(null);

  const handle = useMatches().slice(-1)[0].handle as RouteHandle | undefined;
  const parentPathname = useMatches().slice(-2)[0].pathname;

  const hydrated = useHydrated();
  const sharedData = useMemo(
    () => ({
      url: "https://shenzhengo.net/",
      title: "ShenzhenGo - Map of Shenzhen for Foreigners",
      text: "ShenzhenGo offers detailed information & guides of places and attractions in Shenzhen, China for foreign tourists and residents.",
    }),
    [],
  );
  const canShare = useMemo(
    () => hydrated && navigator.canShare?.(sharedData),
    [hydrated, sharedData],
  );

  return (
    <AppMapContext.Provider value={{ focus, setFocus }}>
      <div className="flex flex-col">
        <header className="flex h-16 flex-row justify-between border-b px-4 py-2 dark:border-gray-700 dark:bg-gray-900">
          <div
            className={twMerge(
              "flex flex-row items-center gap-4",
              handle?.backButtonLabel && "hidden md:flex",
            )}
          >
            <Logo />
            <span className="hidden items-center rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-500 sm:inline-flex dark:bg-gray-800 dark:text-gray-400">
              <span className="md:hidden">
                Explore {places.length}+ places across Shenzhen
              </span>
              <span className="hidden md:block">
                Explore {places.length}+ places and attractions across Shenzhen,
                China
              </span>
            </span>
          </div>
          <div className="flex flex-row items-center gap-3">
            {handle?.backButtonLabel && (
              <Button
                as={Link}
                className="inline-flex md:hidden"
                size="sm"
                to={parentPathname}
              >
                <IconChevronLeft className="h-4 w-4" />
                {handle.backButtonLabel}
              </Button>
            )}
          </div>
          <div className="flex flex-row items-center gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <NavButton
                  aria-label="Share"
                  className={twMerge(!canShare && "hidden")}
                  to="/share"
                  onClick={async (e) => {
                    e.preventDefault();
                    await navigator.share(sharedData);
                  }}
                >
                  <IconShare />
                </NavButton>
              </TooltipTrigger>
              <TooltipContent side="bottom">Share</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <NavButton
                  aria-label="Weather"
                  target="_blank"
                  to="https://www.qweather.com/en/weather/yantian-101280607.html"
                >
                  <IconCloudRain />
                </NavButton>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <div className="flex gap-1">
                  Weather
                  <IconExternalLink className="h-4 w-4" />
                </div>
              </TooltipContent>
            </Tooltip>
          </div>
        </header>
        <div className="flex h-[calc(100dvh-4rem-4.5rem)] flex-grow flex-row md:h-[calc(100dvh-4rem)]">
          <nav className="z-10 hidden flex-shrink-0 flex-col items-center justify-between border-r bg-white px-4 py-6 md:flex dark:border-gray-700 dark:bg-gray-900">
            <div className="flex flex-col items-center gap-3">
              <Tooltip>
                <TooltipTrigger asChild>
                  <NavButton aria-label="Map" to="/">
                    <IconMap2 />
                  </NavButton>
                </TooltipTrigger>
                <TooltipContent side="right">Map</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <NavButton aria-label="Activities" to="/activities">
                    <IconRun />
                  </NavButton>
                </TooltipTrigger>
                <TooltipContent side="right">Activities</TooltipContent>
              </Tooltip>
            </div>
            <div className="flex flex-col items-center gap-3">
              <AboutDialog>
                <button
                  aria-label="About"
                  className="focus-ring inline-block rounded-lg p-2 text-gray-500 transition-all hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                >
                  <IconInfoCircle />
                </button>
              </AboutDialog>
            </div>
          </nav>
          <div className="relative h-full w-full overflow-hidden bg-white dark:bg-gray-900">
            <Outlet />
          </div>
        </div>
        <nav className="z-10 flex h-[4.5rem] flex-shrink-0 items-center justify-evenly border-t bg-white md:hidden dark:border-t-gray-700 dark:bg-gray-900">
          <NavButton aria-label="Map" to="/">
            <IconMap2 />
          </NavButton>
          <NavButton aria-label="Search" to="/search">
            <IconSearch />
          </NavButton>
          <NavButton aria-label="Activities" to="/activities">
            <IconRun />
          </NavButton>
        </nav>
      </div>
    </AppMapContext.Provider>
  );
}

export function ErrorBoundary() {
  return (
    <ErrorAlert
      clientErrorMessage={
        <p>
          <span className="font-medium">
            Sorry, ShenzhenGo is currently unavailable.
          </span>{" "}
          Please try refreshing the page or contact our support team for
          assistance.
        </p>
      }
      routeErrorMessage={
        <p>
          <span className="font-medium">
            Sorry, ShenzhenGo is currently unavailable.
          </span>{" "}
          Please try refreshing the page or contact our support team for
          assistance.
        </p>
      }
    />
  );
}
