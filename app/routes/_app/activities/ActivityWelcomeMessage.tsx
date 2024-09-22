import { IconLanguage, IconMapPin, IconRun } from "@tabler/icons-react";
import { twMerge } from "tailwind-merge";

export interface ActivityWelcomeMessageProps
  extends React.ComponentProps<"div"> {
  hideClickMessage?: boolean;
}

export default function ActivityWelcomeMessage({
  hideClickMessage,
  className,
  children,
  ...props
}: ActivityWelcomeMessageProps) {
  return (
    <div
      className={twMerge(
        "flex flex-col items-center gap-4 text-gray-800 dark:text-gray-100",
        className,
      )}
      {...props}
    >
      <div className="flex flex-col items-center gap-2">
        <IconRun className="h-8 w-8" />
        <h1 className="text-xl font-bold">Activities</h1>
      </div>
      <div className="flex flex-col items-center gap-2 text-gray-500 dark:text-gray-400">
        {!hideClickMessage && <p>Click an activity from the list to...</p>}
        <ul className="flex flex-col gap-2 text-sm">
          <li className="flex gap-2">
            <IconMapPin className="flex-shrink-0" />
            <p className="!text-left">
              See our recommended places where you may enjoy yourself.
            </p>
          </li>
          <li className="flex gap-2">
            <IconLanguage className="flex-shrink-0" />
            <p className="!text-left">
              Learn commonly used Chinese words to better communicate.
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}
