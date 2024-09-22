import { type MetaFunction } from "@remix-run/cloudflare";
import { NavLink, Outlet, useParams } from "@remix-run/react";
import { useId, useMemo } from "react";
import { twMerge } from "tailwind-merge";

import ErrorAlert from "~/components/ErrorAlert";
import { type Place } from "~/data/schema";
import { findLocation } from "~/utilities/data";
import { mergeMeta } from "~/utilities/remix";

import { useAppLoaderData } from "..";
import ActivityCard from "../ActivityCard";
import ActivityWelcomeMessage from "./ActivityWelcomeMessage";

export const meta: MetaFunction<
  null,
  { "routes/_app/index": typeof useAppLoaderData }
> = mergeMeta(({ matches, params }) => {
  const activity = matches
    .find(({ id }) => id === "routes/_app/index")
    ?.data.activities.find(({ id }) => id === params.activityId);
  return [{ title: `${activity ? activity.name : "Activities"} | ShenzhenGo` }];
});

export default function ActivitiesPage() {
  const { places, activities } = useAppLoaderData();
  const { activityId } = useParams<{ activityId: string }>();

  const activityPlacesMapping = useMemo(
    () =>
      new Map(
        activities.map((activity) => [
          activity.id,
          [
            ...((activity?.placeLocations
              ?.map((location) => findLocation(places, location))
              .filter(Boolean) as Place[]) ?? []),
            ...(activity?.categoryIds?.flatMap((id) =>
              places.filter(({ categoryId }) => categoryId === id),
            ) ?? []),
          ],
        ]),
      ),
    [places, activities],
  );

  const activity = useMemo(
    () =>
      activityId
        ? (activities.find(({ id }) => id === activityId) ?? null)
        : null,
    [activities, activityId],
  );
  const relevantPlaces = useMemo(
    () => (activityId ? (activityPlacesMapping.get(activityId) ?? null) : null),
    [activityPlacesMapping, activityId],
  );

  const activitiesLabelId = useId();

  return (
    <div className="flex h-full w-full">
      <aside
        className={twMerge(
          "flex w-full flex-shrink-0 flex-col overflow-y-scroll bg-white px-4 py-6 md:w-80 md:border-r dark:bg-gray-900 dark:md:border-gray-700",
          activityId && "hidden md:block",
        )}
      >
        <div className="flex flex-col gap-6">
          <ActivityWelcomeMessage hideClickMessage className="md:hidden" />
          <div className="flex flex-col gap-3">
            <span
              className="sr-only px-3 text-xs uppercase text-gray-500 md:not-sr-only dark:text-gray-400"
              id={activitiesLabelId}
            >
              Activities
            </span>
            <ul
              aria-labelledby={activitiesLabelId}
              className="flex flex-col gap-3"
            >
              {activities.map((activity, i) => (
                <li key={i}>
                  <ActivityCard
                    withButtonStyle
                    activity={activity}
                    as={NavLink}
                    to={`/activities/${activity.id}`}
                    // @ts-expect-error
                    className={({ isActive }) =>
                      isActive ? "bg-blue-50 dark:bg-blue-950" : ""
                    }
                    relevantPlacesCount={
                      activityPlacesMapping.get(activity.id)?.length
                    }
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>
      <main
        className={twMerge(
          "w-full bg-white dark:bg-gray-900",
          !activityId && "hidden md:block",
        )}
      >
        <Outlet context={{ activity, relevantPlaces }} />
      </main>
    </div>
  );
}

export function ErrorBoundary() {
  return (
    <ErrorAlert
      clientErrorMessage={
        <p>
          <span className="font-medium">
            Oops! Something went wrong while showing available activities.
          </span>{" "}
          Please try refreshing the page. If the issue continues, feel free to
          contact our support team for assistance.
        </p>
      }
    />
  );
}
