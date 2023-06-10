import Alert from "~/components/Alert";

export default function ActivityNull() {
  return (
    <div className="grid h-full w-full place-items-center bg-white dark:bg-gray-900">
      <Alert className="m-4 max-w-md" variant="dark">
        Choose a guide on the left to open.
      </Alert>
    </div>
  );
}
