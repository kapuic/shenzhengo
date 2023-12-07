import { IconBook2, IconLanguage, IconMapPin } from "@tabler/icons-react";
import { twMerge } from "tailwind-merge";

export interface GuideWelcomeMessageProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
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
        <IconBook2 className="h-8 w-8" />
        <h1 className="text-xl font-bold">Guides</h1>
      </div>
      <div className="flex flex-col gap-2">
        {!hideClickMessage && <p>Click a guide on the left to...</p>}
        <div className="flex gap-2">
          <IconMapPin className="flex-shrink-0" />
          <p className="!text-left text-sm">
            See our recommended places where you may enjoy yourself.
          </p>
        </div>
        <div className="flex gap-2">
          <IconLanguage className="flex-shrink-0" />
          <p className="!text-left text-sm">
            Learn commonly used Chinese words to better communicate.
          </p>
        </div>
      </div>
    </div>
  );
}
