import BaseCard, { type BaseCardProps } from "~/components/BaseCard";

import { type Place } from "./types";

export interface PlaceCardProps extends BaseCardProps {
  place: Place;
}

export default function PlaceCard({ place, ...props }: PlaceCardProps) {
  return (
    <BaseCard {...props}>
      <h3 className="text-lg font-bold leading-tight text-gray-800 dark:text-gray-100">
        {place.translation}
      </h3>
      <p
        className="text-xs font-medium text-gray-500 dark:text-gray-400"
        lang="zh_CN"
      >
        {place.name}
      </p>
    </BaseCard>
  );
}
