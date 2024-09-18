import { Outlet } from "@remix-run/react";

import ErrorAlert from "~/components/ErrorAlert";
import { type RouteHandle } from "~/utilities/remix";

export const handle: RouteHandle = {
  backButtonLabel: "All Guides",
};

export default function GuidesGuideLayout() {
  return (
    <div className="h-full w-full overflow-y-scroll px-6 py-6">
      <div className="prose mx-auto dark:prose-invert">
        <Outlet />
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  return (
    <ErrorAlert
      clientErrorMessage={
        <p>
          <span className="font-medium">
            Oops! Something went wrong while showing this guide.
          </span>{" "}
          Please try refreshing the page. If the issue continues, feel free to
          contact our support team for assistance.
        </p>
      }
    />
  );
}
