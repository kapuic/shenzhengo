import { IconQuestionMark } from "@tabler/icons-react";

import Alert from "~/components/ui/Alert";

export default function PageNotFound() {
  return (
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
