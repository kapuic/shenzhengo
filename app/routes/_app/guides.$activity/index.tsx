import { Link, useOutletContext } from "@remix-run/react";
import { IconChevronLeft, IconQuestionMark } from "@tabler/icons-react";

import Alert from "~/components/Alert";
import { getPlaceByLocation, getPlacesByType } from "~/utilities/data";

import PlaceCard from "../PlaceCard";
import { type Activity, type Place } from "../types";

export default function ActivityPage() {
  const activity = useOutletContext<Activity | undefined>();

  const places = [
    ...((activity?.associated_places
      ?.map((location) => getPlaceByLocation(location))
      .filter(Boolean) as Place[]) ?? []),
    ...(activity?.associated_types
      ?.map((type) => getPlacesByType(type))
      .flat() ?? []),
  ];

  return activity ? (
    <div className="flex h-full flex-col gap-6 overflow-y-scroll p-10 md:p-20">
      <div className="md:hidden">
        <Link
          className="inline-flex items-center justify-center gap-2 rounded-md border bg-white px-4 py-3 align-middle text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:hover:bg-slate-800 dark:hover:text-gray-100 dark:focus:ring-offset-gray-900"
          to="/guides"
        >
          <IconChevronLeft />
          Guides
        </Link>
      </div>
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
        {activity.name}
      </h1>
      <div className="flex flex-col gap-4">
        {places.length > 0 && (
          <div className="flex flex-col gap-2">
            <h2 className="text-xl text-gray-800 dark:text-gray-100">
              Associated Places
            </h2>
            <div className="flex flex-wrap gap-2">
              {places.map((place, i) => (
                <Link
                  key={i}
                  className="group"
                  to={`/?lng=${place.location[0]}&lat=${place.location[1]}`}
                >
                  <PlaceCard withButtonStyle place={place} />
                </Link>
              ))}
            </div>
          </div>
        )}
        {activity.vocab && (
          <div className="flex flex-col gap-2">
            <h2 className="text-xl text-gray-800 dark:text-gray-100">
              Commonly Used Vocabulary
            </h2>
            <div className="flex flex-wrap justify-between gap-2">
              {activity.vocab.map((word, i) => (
                <div
                  key={i}
                  className="flex flex-grow flex-col rounded-xl border bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:shadow-slate-700/[.7] md:p-5"
                >
                  <div className="flex items-center gap-2">
                    <p
                      className="text-lg font-semibold text-gray-800 dark:text-gray-100"
                      lang="zh_CN"
                    >
                      {word.chinese}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {word.pinyin}
                    </p>
                  </div>
                  <p className="text-gray-800 dark:text-gray-100">
                    {word.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className="grid h-full w-full place-items-center bg-white dark:bg-gray-900">
      <Alert className="m-4 max-w-md" variant="warning">
        <IconQuestionMark
          className="mr-3 inline h-5 w-5 flex-shrink-0"
          size={20}
        />
        <div>
          <span className="font-medium">Page not found.</span> Please check if
          the URL is correct.
        </div>
      </Alert>
    </div>
  );
}
