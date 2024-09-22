import { IconLanguage, IconMapPin } from "@tabler/icons-react";

import BaseCard, {
  type BaseCardDefaultElement,
  type BaseCardProps,
} from "~/components/BaseCard";
import { type Activity } from "~/data/schema";

export type ActivityCardProps<
  T extends React.ElementType = typeof BaseCardDefaultElement,
> = BaseCardProps<T> & {
  activity: Activity;
  relevantPlacesCount?: number;
};

export default function ActivityCard<
  T extends React.ElementType = typeof BaseCardDefaultElement,
>({ activity, relevantPlacesCount, ...props }: ActivityCardProps<T>) {
  return (
    // @ts-expect-error
    <BaseCard {...props}>
      <h3 className="text-lg font-bold leading-tight text-gray-800 dark:text-gray-100">
        {activity.name}
      </h3>
      <div className="flex gap-2">
        {(activity.categoryIds || activity.placeLocations) && (
          <span className="inline-flex gap-1 text-xs font-medium text-gray-500 dark:text-gray-400">
            <IconMapPin className="h-4 w-4" />
            {relevantPlacesCount} Places
          </span>
        )}
        {activity.vocab && (
          <span className="inline-flex gap-1 text-xs font-medium text-gray-500 dark:text-gray-400">
            <IconLanguage className="h-4 w-4" />
            {activity.vocab.length} Vocabularies
          </span>
        )}
      </div>
    </BaseCard>
  );
}
