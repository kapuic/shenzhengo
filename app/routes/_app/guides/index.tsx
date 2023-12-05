import { type MetaFunction } from "@remix-run/cloudflare";
import { NavLink, Outlet, useParams } from "@remix-run/react";
import { IconExclamationCircle } from "@tabler/icons-react";
import { useId, useMemo } from "react";
import { twMerge } from "tailwind-merge";

import Alert from "~/components/Alert";

import { useAppLoaderData } from "../../_app";
import ActivityCard from "../ActivityCard";

export const meta: MetaFunction = ({ params, data }) => {
  console.log(data);
  // const activity = activities.find(({ id }) => id === params.activity);
  // return [{ title: `${activity ? activity.name : "Guides"} | MeishaGo` }];
  return [{ title: `Guides | MeishaGo` }];
};

export default function Guide() {
  const { activities } = useAppLoaderData();

  const { activity: activityId } = useParams() as { activity: string };
  const activity = useMemo(
    () => activities.find(({ id }) => id === activityId),
    [activities, activityId],
  );

  const activitiesLabelId = useId();

  return (
    <div className="flex h-full w-full">
      <div
        className={twMerge(
          "flex w-full flex-shrink-0 flex-col overflow-y-scroll bg-white px-4 py-6 dark:bg-gray-900 md:w-72 md:border-r dark:md:border-gray-700",
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
                  <ActivityCard
                    withButtonStyle
                    activity={activity}
                    as={NavLink}
                    className="group"
                    to={activity.id}
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
