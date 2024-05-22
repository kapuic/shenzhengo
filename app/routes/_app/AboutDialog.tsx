import * as Dialog from "@radix-ui/react-dialog";
import { IconX } from "@tabler/icons-react";

import Button from "~/components/Button";
import { arrayToSentence } from "~/utilities/i18n";

import Logo from "../../components/Logo";
import { useAppLoaderData } from ".";

export interface AboutDialogProps {
  children: React.ReactNode;
}

export default function AboutDialog({ children }: AboutDialogProps) {
  const { places } = useAppLoaderData();

  return (
    <Dialog.Root>
      <Dialog.Trigger children={children} asChild />
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-20 bg-black bg-opacity-50" />
        <Dialog.Content className="pointer-events-none fixed start-0 top-0 z-30 h-full w-full overflow-y-auto overflow-x-hidden">
          <div className="m-3 flex h-[calc(100dvh-0.75rem*2)] items-center sm:mx-auto sm:w-full sm:max-w-lg">
            <div className="flex w-full flex-col rounded-xl border bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:shadow-slate-700/[.7]">
              <div className="flex items-center justify-between border-b px-4 py-3 dark:border-gray-700">
                <h3 className="font-bold text-gray-800 dark:text-gray-100">
                  About ShenzhenGo
                </h3>
                <Dialog.Close asChild>
                  <button
                    className="focus-ring flex h-7 w-7 items-center justify-center rounded-full border border-transparent text-sm font-semibold text-gray-800 transition-all hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-offset-gray-800"
                    type="button"
                  >
                    <span className="sr-only">Close</span>
                    <IconX className="h-4 w-4 flex-shrink-0" />
                  </button>
                </Dialog.Close>
              </div>
              <div className="flex flex-col gap-4 overflow-y-auto p-4 text-gray-800 dark:text-gray-100">
                <div className="flex flex-col items-center gap-2">
                  <div className="h-16">
                    <Logo />
                  </div>
                  <p>
                    ShenzhenGo offers detailed information & guides of{" "}
                    {places.length}+ places and attractions in Shenzhen, China
                    for foreign tourists and residents.
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="text-lg font-bold">Credits</h4>
                  <p>Website designed and developed by Kapui Cheung.</p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-semibold">Designers</span>
                      <span>Kellen Roy</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-semibold">
                        Data Contributors
                      </span>
                      <span>
                        {arrayToSentence([
                          ...new Set(
                            places.flatMap(({ authors }) => authors ?? []),
                          ),
                        ])}
                      </span>
                    </div>
                  </div>
                  <p>Built on open source technologies.</p>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Copyright &copy; {new Date().getFullYear()} Ka Pui Cheung
                    and ShenzhenGo contributors. All rights reserved.
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-end gap-x-2 border-t px-4 py-3 dark:border-gray-700">
                <Dialog.Close asChild>
                  <Button className="dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-offset-gray-800">
                    Close
                  </Button>
                </Dialog.Close>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
