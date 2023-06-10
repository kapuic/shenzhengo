import BaseCard, { type BaseCardProps } from "~/components/BaseCard";

import { type Activity } from "./types";

export interface ActivityCardProps extends BaseCardProps {
  activity: Activity;
}

export default function ActivityCard({
  activity,
  ...props
}: ActivityCardProps) {
  return (
    <BaseCard {...props}>
      <h3 className="text-lg font-bold leading-tight text-gray-800 dark:text-white">
        {activity.name}
      </h3>
      {activity.vocab && (
        <p className="text-xs font-medium text-gray-500 dark:text-gray-500">
          {activity.vocab.length} Words in Vocabulary
        </p>
      )}
    </BaseCard>
  );
}
