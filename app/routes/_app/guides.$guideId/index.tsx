import { useFeatureValue } from "@growthbook/growthbook-react";
import { useOutletContext } from "@remix-run/react";
import {
  IconLanguage,
  IconMapPin,
  IconQuestionMark,
} from "@tabler/icons-react";

import Alert from "~/components/Alert";
import BaseCard from "~/components/BaseCard";
import { type Guide, type Place } from "~/data/schema";
import { type RouteHandle } from "~/utilities/remix";

import PlaceInfoCommon, {
  type PlaceInfoCommonShownElements,
} from "../_index/PlaceInfoCommon";

export const handle: RouteHandle = {
  backButtonLabel: "All Guides",
};

export default function GuidePage() {
  const shownElements = useFeatureValue<PlaceInfoCommonShownElements>(
    "place-guide-elements",
    ["header", "description", "signature-dishes", "related-guides", "author"],
  );

  const { guide, relevantPlaces } = useOutletContext<{
    guide: Guide | null;
    relevantPlaces: Place[] | null;
  }>();

  return guide ? (
    <div className="flex h-full flex-col gap-6 overflow-y-scroll px-4 py-6 md:px-6">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
        {guide.name}
      </h1>
      <div className="flex flex-col gap-8">
        {relevantPlaces && relevantPlaces.length > 0 && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-1 text-gray-800 dark:text-gray-100">
              <IconMapPin />
              <h2 className="text-xl font-bold">Recommended Places</h2>
            </div>
            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
              {relevantPlaces.map((place, i) => (
                <BaseCard key={i}>
                  <PlaceInfoCommon
                    place={place}
                    shownElements={shownElements}
                  />
                </BaseCard>
              ))}
            </div>
          </div>
        )}
        {guide.vocab && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-1 text-gray-800 dark:text-gray-100">
              <IconLanguage />
              <h2 className="text-xl font-bold">Commonly Used Vocabularies</h2>
            </div>
            <div className="flex flex-wrap justify-between gap-2">
              {guide.vocab.map((word, i) => (
                <div
                  key={i}
                  className="flex flex-grow flex-col rounded-xl border bg-white p-4 shadow-sm md:p-5 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:shadow-slate-700/[.7]"
                >
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                      {word.pinyin}
                    </p>
                    <p
                      className="text-sm text-gray-500 dark:text-gray-400"
                      lang="zh_CN"
                    >
                      {word.chinese}
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
