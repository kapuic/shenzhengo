import { GrowthBook, GrowthBookProvider } from "@growthbook/growthbook-react";
import {
  json,
  type LinksFunction,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/cloudflare";
import { cssBundleHref } from "@remix-run/css-bundle";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  type ShouldRevalidateFunction,
  useLoaderData,
  useLocation,
  useRouteLoaderData,
} from "@remix-run/react";
import { useEffect, useMemo } from "react";

import tailwind from "~/tailwind.css";

import { TooltipProvider } from "./components/Tooltip";
import { mergeMeta } from "./utilities/remix";

export const meta: MetaFunction<typeof loader> = mergeMeta(() => [
  { name: "theme-color", content: "#1659be" },
  { name: "msapplication-TileColor", content: "#1659be" },
  { name: "msapplication-config", content: "/icons/browserconfig.xml" },
]);

export const links: LinksFunction = () => [
  ...["16", "32"].map((size) => ({
    rel: "icon",
    href: `/icons/favicon-${size}x${size}.png`,
    sizes: `${size}x${size}`,
    type: "image/png",
  })),
  { rel: "mask-icon", href: "/icons/safari-pinned-tab.svg", color: "#1659be" },
  ...["60", "76", "120", "152", "180"].map((size) => ({
    rel: "apple-touch-icon",
    href: `/icons/apple-touch-icon-${size}x${size}.png`,
    sizes: `${size}x${size}`,
  })),
  { rel: "manifest", href: "/icons/site.webmanifest" },
  { rel: "shortcut icon", href: "/icons/favicon.ico" },

  { rel: "stylesheet", href: tailwind },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export async function loader({ context }: LoaderFunctionArgs) {
  return json({
    featureCtl: {
      apiHost: context.env.GROWTHBOOK_API_HOST,
      clientKey: context.env.GROWTHBOOK_CLIENT_KEY,
      decryptionKey: context.env.GROWTHBOOK_DECRYPTION_KEY,
    },
  });
}

export function useRootLoaderData() {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return useRouteLoaderData<typeof loader>("root")!;
}

export const shouldRevalidate: ShouldRevalidateFunction = ({ formMethod }) =>
  !!formMethod;

export default function App() {
  const { featureCtl } = useLoaderData<typeof loader>();
  const location = useLocation();

  const growthBook = useMemo(
    () =>
      new GrowthBook({
        apiHost: featureCtl.apiHost,
        clientKey: featureCtl.clientKey,
        remoteEval: true,
        enableDevMode: process.env.NODE_ENV === "development",
        subscribeToChanges: true,
      }),
    [featureCtl],
  );
  useEffect(() => {
    growthBook.loadFeatures();
  }, [growthBook]);
  useEffect(() => {
    growthBook.setURL(location.pathname);
  }, [growthBook, location.pathname]);

  return (
    <GrowthBookProvider growthbook={growthBook}>
      <TooltipProvider>
        <html lang="en">
          <head>
            <meta charSet="utf-8" />
            <meta
              content="width=device-width,initial-scale=1"
              name="viewport"
            />
            <Meta />
            <Links />
            <script
              defer
              data-domain="meishago.kapui.net"
              src="https://analytics.kapui.net/js/script.js"
            ></script>
          </head>
          <body>
            <Outlet />
            <ScrollRestoration />
            <Scripts />
            <LiveReload />
          </body>
        </html>
      </TooltipProvider>
    </GrowthBookProvider>
  );
}
