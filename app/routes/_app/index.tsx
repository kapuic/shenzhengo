import { json, type V2_MetaFunction } from "@remix-run/cloudflare";
import {
  NavLink,
  Outlet,
  useLoaderData,
  useSearchParams,
} from "@remix-run/react";
import { type RemixNavLinkProps } from "@remix-run/react/dist/components";
import { IconBook, IconMap2 } from "@tabler/icons-react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

import activities from "~/data/activities";
import places from "~/data/places";
import { useUpdateQueryStringValueWithoutNavigation } from "~/utilities/hooks";

import AppMapContext from "./AppMapContext";
import { type Activity, type Place } from "./types";

export const meta: V2_MetaFunction = () => {
  return [{ title: "MeishaGo" }];
};

export function loader() {
  return json({
    places: places as Place[],
    activities: activities as Activity[],
  });
}

function NavButton({ className, children, ...props }: RemixNavLinkProps) {
  return (
    <NavLink
      className={({ isActive }) =>
        twMerge(
          "inline-block rounded-lg p-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900",
          isActive
            ? "bg-blue-100 text-blue-500 dark:bg-gray-800 dark:text-blue-400"
            : "focus:outline-nones text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
        )
      }
      {...props}
    >
      {children}
    </NavLink>
  );
}

export default function App() {
  const { places } = useLoaderData<typeof loader>();

  const [searchParams] = useSearchParams();
  const queryLng = searchParams.get("lng");
  const queryLat = searchParams.get("lat");
  const queryPlace =
    queryLng && queryLat
      ? places.find(
          ({ location }) =>
            location[0] === parseFloat(queryLng) &&
            location[1] === parseFloat(queryLat)
        ) ?? null
      : null;

  const [focus, setFocus] = useState<Place | null>(queryPlace);

  useUpdateQueryStringValueWithoutNavigation(
    "lng",
    focus?.location[0].toString() ?? ""
  );
  useUpdateQueryStringValueWithoutNavigation(
    "lat",
    focus?.location[1].toString() ?? ""
  );

  return (
    <AppMapContext.Provider value={{ focus, setFocus }}>
      <div className="flex h-[100dvh] flex-col md:flex-row">
        <aside className="hidden md:block">
          <div className="flex h-[100dvh] w-16 flex-col items-center border-r bg-white py-6 dark:border-gray-700 dark:bg-gray-900">
            <nav className="flex flex-col items-center gap-4">
              <NavButton to="/">
                <IconMap2 />
              </NavButton>
              <NavButton to="/guides">
                <IconBook />
              </NavButton>
            </nav>
            <div className="flex flex-col items-center gap-4">
              {/* <NavButton to="/improve">
                <IconPlus />
              </NavButton> */}
            </div>
          </div>
        </aside>
        <Outlet />
        <nav className="flex h-[4.5rem] flex-shrink-0 items-center justify-evenly border-t bg-white dark:border-t-gray-700 dark:bg-gray-900 md:hidden">
          <NavButton to="/">
            <IconMap2 />
          </NavButton>
          <NavButton to="/guides">
            <IconBook />
          </NavButton>
        </nav>
      </div>
    </AppMapContext.Provider>
  );
}
