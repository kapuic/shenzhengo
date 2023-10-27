import { type MetaFunction, type SerializeFrom } from "@remix-run/cloudflare";
import {
  NavLink,
  Outlet,
  useParams,
  useRouteLoaderData,
} from "@remix-run/react";
import { IconExclamationCircle } from "@tabler/icons-react";
import { useId, useMemo } from "react";
import { twMerge } from "tailwind-merge";

import Alert from "~/components/Alert";
import activities from "~/data/activities";

import { type loader } from "../../_app";
import ActivityCard from "../ActivityCard";

export const meta: MetaFunction = ({ params }) => {
  const activity = activities.find(({ id }) => id === params.activity);
  return [{ title: `${activity ? activity.name : "Guides"} | MeishaGo` }];
};

export default function Guide() {
  const { activities } = useRouteLoaderData(
    "routes/_app/index",
  ) as SerializeFrom<typeof loader>;
  const { activity: activityId } = useParams() as { activity: string };
  const activity = useMemo(
    () => activities.find(({ id }) => id === activityId),
    [activities, activityId],
  );

  const activitiesLabelId = useId();

  return (
    <div className="flex flex-grow">
      <div
        className={twMerge(
          "flex h-[calc(100dvh-4.5rem)] w-full flex-shrink-0 flex-col overflow-y-scroll bg-white px-4 py-6 dark:bg-gray-900 md:h-[100dvh] md:w-72 md:border-r dark:md:border-gray-700",
          activityId && "hidden md:block",
        )}
      >
        <div className="flex flex-col gap-4">
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
                  <NavLink className="group" to={activity.id}>
                    <ActivityCard withButtonStyle activity={activity} />
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div
        className={twMerge(
          "h-[calc(100dvh-4.5rem)] w-full bg-white dark:bg-gray-900 md:h-[100dvh]",
          !activityId && "hidden md:block",
        )}
      >
        <Outlet context={activity} />
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
