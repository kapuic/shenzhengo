import { IconBook, IconBulb, IconCar, IconMountain } from "@tabler/icons-react";
import { twMerge } from "tailwind-merge";

export interface GuideWelcomeMessageProps
  extends React.ComponentPropsWithoutRef<"div"> {
  hideClickMessage?: boolean;
}

export default function GuideWelcomeMessage({
  hideClickMessage,
  className,
  children,
  ...props
}: GuideWelcomeMessageProps) {
  return (
    <div
      className={twMerge(
        "flex flex-col items-center gap-4 text-gray-800 dark:text-gray-100",
        className,
      )}
      {...props}
    >
      <div className="flex flex-col items-center gap-2">
        <IconBook className="h-8 w-8" />
        <h1 className="text-xl font-bold">Guides</h1>
      </div>
      <div className="flex flex-col items-center gap-2 text-gray-500 dark:text-gray-400">
        {!hideClickMessage && <p>Click a guide from the list to...</p>}
        <ul className="flex flex-col gap-2 text-sm">
          <li className="flex gap-2">
            <IconMountain className="flex-shrink-0" />
            <p className="!text-left">
              Discover exciting routes and scenic spots.
            </p>
          </li>
          <li className="flex gap-2">
            <IconCar className="flex-shrink-0" />
            <p className="!text-left">
              Get detailed instructions on transportation, dining options, and
              local attractions.
            </p>
          </li>
          <li className="flex gap-2">
            <IconBulb className="flex-shrink-0" />
            <p className="!text-left">
              Plan the perfect adventure with insider tips.
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}
