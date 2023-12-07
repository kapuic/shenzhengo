import { type MetaFunction } from "@remix-run/cloudflare";
import { NavLink, Outlet, useParams } from "@remix-run/react";
import { IconExclamationCircle } from "@tabler/icons-react";
import { useId, useMemo } from "react";
import { twMerge } from "tailwind-merge";

import Alert from "~/components/Alert";
import { type Place } from "~/data/schema";
import { findLocation } from "~/utilities/data";
import { mergeMeta } from "~/utilities/remix";

import { useAppLoaderData } from "../../_app";
import GuideCard from "../GuideCard";
import GuideWelcomeMessage from "./GuideWelcomeMessage";

export const meta: MetaFunction<
  null,
  { "routes/_app/index": typeof useAppLoaderData }
> = mergeMeta(({ matches, params }) => {
  const guide = matches
    .find(({ id }) => id === "routes/_app/index")
    ?.data.guides.find(({ id }) => id === params.guideId);
  return [{ title: `${guide ? guide.name : "Guides"} | MeishaGo` }];
});

export default function GuidesPage() {
  const { places, guides } = useAppLoaderData();
  const { guideId } = useParams<{ guideId: string }>();

  const guidePlacesMapping = useMemo(
    () =>
      new Map(
        guides.map((guide) => [
          guide.id,
          [
            ...((guide?.placeLocations
              ?.map((location) => findLocation(places, location))
              .filter(Boolean) as Place[]) ?? []),
            ...(guide?.categoryIds?.flatMap((id) =>
              places.filter(({ categoryId }) => categoryId === id),
            ) ?? []),
          ],
        ]),
      ),
    [places, guides],
  );

  const guide = useMemo(
    () => (guideId ? guides.find(({ id }) => id === guideId) ?? null : null),
    [guides, guideId],
  );
  const relevantPlaces = useMemo(
    () => (guideId ? guidePlacesMapping.get(guideId) ?? null : null),
    [guidePlacesMapping, guideId],
  );

  const guidesLabelId = useId();

  return (
    <div className="flex h-full w-full">
      <div
        className={twMerge(
          "flex w-full flex-shrink-0 flex-col overflow-y-scroll bg-white px-4 py-6 dark:bg-gray-900 md:w-72 md:border-r dark:md:border-gray-700",
          guideId && "hidden md:block",
        )}
      >
        <div className="flex flex-col gap-6">
          <GuideWelcomeMessage hideClickMessage className="md:hidden" />
          <div className="flex flex-col gap-3">
            <span
              className="px-3 text-xs uppercase text-gray-500 dark:text-gray-400"
              id={guidesLabelId}
            >
              Guides
            </span>
            <ul aria-labelledby={guidesLabelId} className="flex flex-col gap-3">
              {guides.map((guide, i) => (
                <li key={i}>
                  <GuideCard
                    withButtonStyle
                    as={NavLink}
                    guide={guide}
                    to={`/guides/${guide.id}`}
                    className={({ isActive }) =>
                      isActive ? "bg-blue-50 dark:bg-blue-950" : ""
                    }
                    relevantPlacesCount={
                      guidePlacesMapping.get(guide.id)?.length
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
          !guideId && "hidden md:block",
        )}
      >
        <Outlet context={{ guide, relevantPlaces }} />
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
