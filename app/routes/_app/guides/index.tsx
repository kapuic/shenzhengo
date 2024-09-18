import { json, type MetaFunction } from "@remix-run/cloudflare";
import { Link, Outlet, useLoaderData, useMatches } from "@remix-run/react";
import { useId } from "react";
import { twMerge } from "tailwind-merge";

import ErrorAlert from "~/components/ErrorAlert";
import { mergeMeta } from "~/utilities/remix";

import GuideCard from "../GuideCard";
import { getGuides } from "./data";
import GuideWelcomeMessage from "./GuideWelcomeMessage";

export const meta: MetaFunction = mergeMeta(({ matches, params }) => {
  return [{ title: `Guides | ShenzhenGo` }];
});

export async function loader() {
  const posts = await getGuides();
  return json(posts);
}

export default function GuidesPage() {
  const guides = useLoaderData<typeof loader>();
  const { id } = useMatches().slice(-1)[0];
  const guideId =
    id.match(/^routes\._app\.guides\._guide\.([\w-]+)\.index$/)?.[0] ?? null;

  const guidesLabelId = useId();

  return (
    <div className="flex h-full w-full">
      <aside
        className={twMerge(
          "flex w-full flex-shrink-0 flex-col overflow-y-scroll bg-white px-4 py-6 md:w-80 md:border-r dark:bg-gray-900 dark:md:border-gray-700",
          guideId && "hidden md:block",
        )}
      >
        <div className="flex flex-col gap-6">
          <GuideWelcomeMessage hideClickMessage className="md:hidden" />
          <div className="flex flex-col gap-3">
            <span
              className="sr-only px-3 text-xs uppercase text-gray-500 md:not-sr-only dark:text-gray-400"
              id={guidesLabelId}
            >
              Guides
            </span>
            <ul aria-labelledby={guidesLabelId} className="flex flex-col gap-3">
              {guides.map((activity, i) => (
                <li key={i}>
                  <GuideCard
                    withButtonStyle
                    as={Link}
                    guide={activity}
                    to={activity.slug}
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
          !guideId && "hidden md:block",
        )}
      >
        <Outlet />
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
            Oops! Something went wrong while showing available guides.
          </span>{" "}
          Please try refreshing the page. If the issue continues, feel free to
          contact our support team for assistance.
        </p>
      }
      routeErrorMessage={
        <p>
          <span className="font-medium">
            Oops! Something went wrong while loading available guides.
          </span>{" "}
          Please try refreshing the page. If the issue continues, feel free to
          contact our support team for assistance.
        </p>
      }
    />
  );
}
