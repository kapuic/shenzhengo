import { IconChevronDown } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

import { useHydratedEffect } from "~/utilities/hooks";
import { type CenteredTreeLevel } from "~/utilities/tree";

import Dropdown from "./dropdown";

export interface LabeledItem {
  id: string;
  label: string;
}

export type TabSelectTab<T extends LabeledItem> = CenteredTreeLevel<T>;

export interface TabSelectProps<
  T extends TabSelectTab<V>[],
  V extends LabeledItem,
> {
  tabs: T;
  active: string;
  setActive: (tab: string) => void;
}

export default function TabSelect<
  T extends TabSelectTab<V>[],
  V extends LabeledItem,
>({ tabs, active, setActive }: TabSelectProps<T, V>) {
  const [disabled, setDisabled] = useState(false);
  useHydratedEffect(() => {
    setDisabled(true);
    const timeout = setTimeout(() => setDisabled(false), 350);
    return () => clearTimeout(timeout);
  }, [active]);

  return (
    // This component uses many non-standard colors because of its complexity.
    <div className="flex rounded-lg bg-gray-100 p-1 transition hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700">
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role */}
      <nav aria-label="Tabs" className="flex space-x-2" role="tablist">
        {tabs.map(({ center, siblings }) => (
          <div key={center.id} className="relative px-3 py-2 text-xs">
            <div className="invisible flex gap-2">
              <span>{center.label}</span>
              {siblings.length > 0 && <IconChevronDown className="h-4 w-4" />}
            </div>

            <button
              disabled={disabled}
              role="tab"
              type="button"
              className={twMerge(
                // `dark:text-gray-400` is used instead of `dark:text-gray-500` because the latter does not have enough contrast with the dark hover background.
                "focus-ring absolute inset-0 z-10 flex items-center justify-center gap-2 rounded-md bg-transparent font-medium text-gray-500 transition-all hover:text-gray-900 focus-visible:ring-offset-gray-100 dark:text-gray-400 dark:hover:text-gray-100 dark:focus-visible:ring-offset-gray-800",
                active === center.id && "text-gray-700 dark:text-gray-300",
              )}
              onClick={() => setActive(center.id)}
            >
              {center.label}
              {siblings.length > 0 && (
                <Dropdown>
                  <Dropdown.Target onClick={(e) => e.stopPropagation()}>
                    <Dropdown.Button className="-m-1 -mr-3 rounded-md p-1 hover:bg-gray-200 dark:hover:bg-gray-700">
                      <IconChevronDown className="h-4 w-4 duration-0" />
                    </Dropdown.Button>
                  </Dropdown.Target>
                  <Dropdown.Menu className="-right-4 min-w-0">
                    <div className="invisible ml-2 flex h-0 gap-2">
                      <span>{center.label}</span>
                      {siblings.length > 0 && (
                        <IconChevronDown className="w-4" />
                      )}
                    </div>

                    {siblings.map((sibling) => (
                      <Dropdown.Item
                        key={sibling.id}
                        className="text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActive(sibling.id);
                        }}
                      >
                        {sibling.label}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </button>
            {active === center.id && (
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
