import { Link, useOutletContext } from "@remix-run/react";
import {
  IconChevronLeft,
  IconHourglassHigh,
  IconQuestionMark,
} from "@tabler/icons-react";

import Alert from "~/components/Alert";
import { type Activity } from "~/data/schema";

export default function ActivityPage() {
  const activity = useOutletContext<Activity | undefined>();

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
      <Alert className="m-4 max-w-md" variant="info">
        <IconHourglassHigh
          className="mr-3 inline h-5 w-5 flex-shrink-0"
          size={20}
        />
        <div>
          <span className="font-medium">Coming soon.</span> Please check back
          later.
        </div>
      </Alert>
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
