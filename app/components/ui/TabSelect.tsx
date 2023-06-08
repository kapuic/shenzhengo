import { twMerge } from "tailwind-merge";

export interface TabSelectTab {
  id: string;
  label: string;
}

export interface TabSelectProps<T extends TabSelectTab[]> {
  tabs: T;
  active: T[number]["id"];
  setActive: (tab: T[number]["id"]) => void;
}

export default function TabSelect<T extends TabSelectTab[]>({
  tabs,
  active,
  setActive,
}: TabSelectProps<T>) {
  return (
    <div className="flex rounded-lg bg-gray-200/[.5] p-1 transition hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-700/[.7]">
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role */}
      <nav aria-label="Tabs" className="flex space-x-2" role="tablist">
        {tabs.map(({ id, label }) => (
          <button
            key={id}
            role="tab"
            type="button"
            className={twMerge(
              "rounded-md px-3 py-2 text-xs font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white",
              active === id &&
                "bg-white text-gray-700 shadow-sm dark:bg-gray-800 dark:text-gray-400"
            )}
            onClick={() => setActive(id)}
          >
            {label}
          </button>
        ))}
      </nav>
    </div>
  );
}
