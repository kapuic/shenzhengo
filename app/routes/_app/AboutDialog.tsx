import * as Dialog from "@radix-ui/react-dialog";
import { Link } from "@remix-run/react";
import { IconBrandLinkedin, IconX } from "@tabler/icons-react";

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
      {children}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-20 bg-black bg-opacity-50" />
        <Dialog.Content className="pointer-events-none fixed start-0 top-0 z-30 h-full w-full overflow-y-auto overflow-x-hidden">
          <div className="m-3 flex h-[calc(100dvh-0.75rem*2)] items-center sm:mx-auto sm:w-full sm:max-w-lg">
            <div className="flex w-full flex-col rounded-xl border bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:shadow-slate-700/[.7]">
              <div className="flex items-center justify-between border-b px-4 py-3 dark:border-gray-700">
                <Dialog.Title className="font-bold text-gray-800 dark:text-gray-100">
                  About ShenzhenGo
                </Dialog.Title>
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
                  <Dialog.Description>
                    The first internationalized interactive map designed for a
                    city in China, featuring rich points of interest
                    information, searchable catalog, travel guides, and trip
                    suggestions. Built to break down language barriers and make
                    local tourism more accessible for foreigners.
                  </Dialog.Description>
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="text-lg font-bold">Credits</h4>
                  <p>
                    Website designed and developed by Kapui (August) Cheung{" "}
                    <Link
                      className="inline-block text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
                      target="_blank"
                      to="https://www.linkedin.com/in/kapui"
                    >
                      <IconBrandLinkedin className="-my-1 h-6 w-6" />
                    </Link>
                    . Original idea by Oliver Lu & Rachel Guo.
                  </p>
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
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold">
                      Special Thanks to
                    </span>
                    <span>
                      Yan Yin, Hao Du, and others who made this possible.
                    </span>
                  </div>
                  <p>Built on open source technologies.</p>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Copyright &copy; 2023&ndash;{new Date().getFullYear()} Ka
                    Pui Cheung and ShenzhenGo contributors. All rights reserved.
                    Map data provided by &copy; {new Date().getFullYear()}{" "}
                    AutoNavi.
                  </span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    All images and other assets used on this website are the
                    property of their respective owners. We do not claim
                    ownership over any third-party content. If you are the
                    rightful owner of any content and believe its use on this
                    website constitutes copyright infringement, please contact
                    us at{" "}
                    <Link to="mailto:contact@shenzhengo.net">
                      contact@shenzhengo.net
                    </Link>{" "}
                    with the details, and we will promptly address the issue.
                  </p>
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
