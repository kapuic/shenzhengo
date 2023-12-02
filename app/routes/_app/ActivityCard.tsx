import { type PolymorphicPropsWithoutRef } from "node_modules/react-polymorphic-types";

import BaseCard, {
  type BaseCardDefaultElement,
  type BaseCardOwnProps,
} from "~/components/BaseCard";
import { type Activity } from "~/data/schema";

export interface ActivityCardOwnProps extends BaseCardOwnProps {
  activity: Activity;
}

export type ActivityCardProps<
  T extends React.ElementType = typeof BaseCardDefaultElement,
> = PolymorphicPropsWithoutRef<ActivityCardOwnProps, T>;

export default function ActivityCard<
  T extends React.ElementType = typeof BaseCardDefaultElement,
>({ activity, ...props }: ActivityCardProps<T>) {
  return (
    <BaseCard {...props}>
      <h3 className="text-lg font-bold leading-tight text-gray-800 dark:text-gray-100">
        {activity.name}
      </h3>
      {activity.vocab && (
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
          {activity.vocab.length} Words in Vocabulary
        </p>
      )}
    </BaseCard>
  );
}
