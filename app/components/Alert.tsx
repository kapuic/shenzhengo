import { twMerge } from "tailwind-merge";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant: "info" | "danger" | "success" | "warning" | "dark";
}

export default function Alert({ className, children, variant }: AlertProps) {
  // From https://flowbite.com/docs/components/alerts/#bordered-alerts.

  return (
    <div
      role="alert"
      className={twMerge(
        "flex rounded-lg border p-4 text-sm dark:bg-gray-800",
        variant === "info"
          ? "border-blue-300 bg-blue-50 text-blue-800 dark:border-blue-800 dark:text-blue-400"
          : variant === "danger"
          ? "border-red-300 bg-red-50 text-red-800 dark:border-red-800 dark:text-red-400"
          : variant === "success"
          ? "mb-4 border-green-300 bg-green-50 text-green-800 dark:border-green-800 dark:text-green-400"
          : variant === "warning"
          ? "border-yellow-300 bg-yellow-50 text-yellow-800 dark:border-yellow-800 dark:text-yellow-300"
          : "border-gray-300 bg-gray-50 text-gray-800 dark:border-gray-600 dark:text-gray-300",
        className,
      )}
    >
      {children}
    </div>
  );
}
