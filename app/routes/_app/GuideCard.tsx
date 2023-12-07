import { IconLanguage, IconMapPin } from "@tabler/icons-react";
import { type PolymorphicPropsWithoutRef } from "node_modules/react-polymorphic-types";

import BaseCard, {
  type BaseCardDefaultElement,
  type BaseCardOwnProps,
} from "~/components/BaseCard";
import { type Guide } from "~/data/schema";

export interface GuideCardOwnProps extends BaseCardOwnProps {
  guide: Guide;
  relevantPlacesCount?: number;
}

export type GuideCardProps<
  T extends React.ElementType = typeof BaseCardDefaultElement,
> = PolymorphicPropsWithoutRef<GuideCardOwnProps, T>;

export default function GuideCard<
  T extends React.ElementType = typeof BaseCardDefaultElement,
>({ guide, relevantPlacesCount, ...props }: GuideCardProps<T>) {
  return (
    <BaseCard {...props}>
      <h3 className="text-lg font-bold leading-tight text-gray-800 dark:text-gray-100">
        {guide.name}
      </h3>
      <div className="flex gap-2">
        {(guide.categoryIds || guide.placeLocations) && (
          <span className="inline-flex gap-1 text-xs font-medium text-gray-500 dark:text-gray-400">
            <IconMapPin className="h-4 w-4" />
            {relevantPlacesCount} Places
          </span>
        )}
        {guide.vocab && (
          <span className="inline-flex gap-1 text-xs font-medium text-gray-500 dark:text-gray-400">
            <IconLanguage className="h-4 w-4" />
            {guide.vocab.length} Vocabularies
          </span>
        )}
      </div>
    </BaseCard>
  );
}
