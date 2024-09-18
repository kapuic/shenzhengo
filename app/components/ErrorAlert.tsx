import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import { IconExclamationCircle } from "@tabler/icons-react";

import Alert from "./Alert";

export interface ErrorAlertProps {
  routeErrorMessage?: React.ReactNode;
  clientErrorMessage?: React.ReactNode;
}

export default function ErrorAlert({
  routeErrorMessage,
  clientErrorMessage,
}: ErrorAlertProps) {
  const error = useRouteError();

  return (
    <div className="grid h-full w-full place-items-center bg-white dark:bg-gray-900">
      {isRouteErrorResponse(error) ? (
        <Alert className="m-4 max-w-md flex-col gap-4" variant="danger">
          <div className="flex gap-3">
            <IconExclamationCircle
              className="inline h-5 w-5 flex-shrink-0"
              size={20}
            />
            {routeErrorMessage ?? (
              <p>
                <span className="font-medium">
                  Oops! Something went wrong while loading or submitting data.
                </span>{" "}
                Please try refreshing the page. If the issue continues, feel
                free to contact our support team for assistance.
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <p>
              {error.status}: {error.statusText}
            </p>
            <textarea className="block w-full rounded-lg border-transparent bg-gray-100 px-4 py-3 font-mono text-xs focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-transparent dark:bg-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600">
              {error.data}
            </textarea>
          </div>
        </Alert>
      ) : (
        <Alert className="m-4 max-w-md flex-col gap-4" variant="danger">
          <div className="flex gap-3">
            <IconExclamationCircle
              className="inline h-5 w-5 flex-shrink-0"
              size={20}
            />
            {clientErrorMessage ?? (
              <p>
                <span className="font-medium">Oops! Something went wrong.</span>{" "}
                Please try refreshing the page and disabling any extensions or
                blockers. If the issue continues, feel free to contact our
                support team for assistance.
              </p>
            )}
          </div>
          {error instanceof Error ? (
            <div className="flex flex-col gap-2">
              <p>
                {error.name}: {error.message}
              </p>
              <textarea className="block w-full rounded-lg border-transparent bg-gray-100 px-4 py-3 font-mono text-xs focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-transparent dark:bg-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600">
                {error.stack}
              </textarea>
            </div>
          ) : (
            <p>Additional information about the issue is not available.</p>
          )}
        </Alert>
      )}
    </div>
  );
}
