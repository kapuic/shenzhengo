import { IconClock, IconUser } from "@tabler/icons-react";
import { type PolymorphicPropsWithoutRef } from "node_modules/react-polymorphic-types";

import BaseCard, {
  type BaseCardDefaultElement,
  type BaseCardOwnProps,
} from "~/components/BaseCard";

import { type GuideMeta } from "./guides/data";

export interface GuideCardOwnProps extends BaseCardOwnProps {
  guide: GuideMeta;
}

export type GuideCardProps<
  T extends React.ElementType = typeof BaseCardDefaultElement,
> = PolymorphicPropsWithoutRef<GuideCardOwnProps, T>;

export default function GuideCard<
  T extends React.ElementType = typeof BaseCardDefaultElement,
>({ guide, ...props }: GuideCardProps<T>) {
  return (
    <BaseCard {...props}>
      <div className="flex flex-col">
        <span className="text-sm font-extrabold leading-tight text-blue-500 dark:text-blue-400">
          {guide.frontmatter.location}
        </span>
        <h3 className="text-lg font-bold leading-tight text-gray-800 dark:text-gray-100">
          {guide.frontmatter.title}
        </h3>
      </div>
      {guide.frontmatter.summary && (
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {guide.frontmatter.summary}
        </p>
      )}
      <div className="flex gap-2">
        {guide.frontmatter.duration && (
          <span className="inline-flex gap-1 text-xs font-medium text-gray-500 dark:text-gray-400">
            <IconClock className="h-4 w-4" />
            {guide.frontmatter.duration}
          </span>
        )}
        {guide.frontmatter.authors && (
          <span className="inline-flex gap-1 text-xs font-medium text-gray-500 dark:text-gray-400">
            <IconUser className="h-4 w-4" />
            {guide.frontmatter.authors.join(", ")}
          </span>
        )}
      </div>
    </BaseCard>
  );
}
