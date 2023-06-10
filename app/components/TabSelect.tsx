import { motion } from "framer-motion";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

import { useHydratedEffect } from "~/utilities/hooks";

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
  const [disabled, setDisabled] = useState(false);
  useHydratedEffect(() => {
    setDisabled(true);
    const timeout = setTimeout(() => setDisabled(false), 350);
    return () => clearTimeout(timeout);
  }, [active]);

  return (
    <div className="flex rounded-lg bg-gray-100 p-1 transition hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700">
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role */}
      <nav aria-label="Tabs" className="flex space-x-2" role="tablist">
        {tabs.map(({ id, label }) => (
          <div key={id} className="relative px-3 py-2 text-xs">
            <span className="invisible">{label}</span>
            <button
              disabled={disabled}
              role="tab"
              type="button"
              className={twMerge(
                "absolute inset-0 z-10 rounded-md bg-transparent font-medium text-gray-500 transition-all hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-100 dark:text-gray-400 dark:hover:text-gray-100 dark:focus-visible:ring-offset-gray-800",
                active === id && "text-gray-700 dark:text-gray-300"
              )}
              onClick={() => setActive(id)}
            >
              {label}
            </button>
            {active === id && (
              <motion.div
                className="absolute inset-0 rounded-md bg-white shadow-sm dark:bg-gray-900"
                layoutId="background"
                transition={{ ease: [0.6, -0.05, 0.01, 0.99], duration: 0.2 }}
              />
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}
