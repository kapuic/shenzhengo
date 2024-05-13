import { type MetaFunction } from "@remix-run/cloudflare";
import { NavLink, Outlet, useParams } from "@remix-run/react";
import { IconExclamationCircle } from "@tabler/icons-react";
import { useId, useMemo } from "react";
import { twMerge } from "tailwind-merge";

import Alert from "~/components/Alert";
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
        ? activities.find(({ id }) => id === activityId) ?? null
        : null,
    [activities, activityId],
  );
  const relevantPlaces = useMemo(
    () => (activityId ? activityPlacesMapping.get(activityId) ?? null : null),
    [activityPlacesMapping, activityId],
  );

  const activitiesLabelId = useId();

  return (
    <div className="flex h-full w-full">
      <div
        className={twMerge(
          "flex w-full flex-shrink-0 flex-col overflow-y-scroll bg-white px-4 py-6 md:w-72 md:border-r dark:bg-gray-900 dark:md:border-gray-700",
          activityId && "hidden md:block",
        )}
      >
        <div className="flex flex-col gap-6">
          <ActivityWelcomeMessage hideClickMessage className="md:hidden" />
          <div className="flex flex-col gap-3">
            <span
              className="px-3 text-xs uppercase text-gray-500 dark:text-gray-400"
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
      </div>
      <div
        className={twMerge(
          "w-full bg-white dark:bg-gray-900",
          !activityId && "hidden md:block",
        )}
      >
        <Outlet context={{ activity, relevantPlaces }} />
      </div>
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
