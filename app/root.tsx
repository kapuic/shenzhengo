import "~/tailwind.css";

import {
  type FeatureApiResponse,
  GrowthBook,
  GrowthBookProvider,
} from "@growthbook/growthbook-react";
import {
  json,
  type LinksFunction,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/cloudflare";
import {
  Links,
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
];

export async function loader({ context }: LoaderFunctionArgs) {
  // Create and initialize a GrowthBook instance
  const growthBook = new GrowthBook({
    apiHost: context.cloudflare.env.GROWTHBOOK_API_HOST,
    clientKey: context.cloudflare.env.GROWTHBOOK_CLIENT_KEY,
    // decryptionKey: context.cloudflare.env.GROWTHBOOK_DECRYPTION_KEY,
    remoteEval: true,
    enableDevMode: context.cloudflare.env.ENVIRONMENT === "development",
  });
  await growthBook.init({ timeout: 1000 });

  // Get the payload to hydrate the client-side GrowthBook instance
  // We need the decrypted payload so the initial client-render can be synchronous
  const payload = growthBook.getDecryptedPayload();

  // Cleanup your GrowthBook instance
  growthBook.destroy();

  return json({
    environment: context.cloudflare.env.ENVIRONMENT,
    featureCtl: {
      apiHost: context.cloudflare.env.GROWTHBOOK_API_HOST,
      clientKey: context.cloudflare.env.GROWTHBOOK_CLIENT_KEY,
      // decryptionKey: context.cloudflare.env.GROWTHBOOK_DECRYPTION_KEY,
      payload,
    },
    aMap: {
      apiKey: context.cloudflare.env.AMAP_API_KEY,
      apiVersion: context.cloudflare.env.AMAP_API_VERSION ?? "2.0.5",
    },
  });
}

export function useRootLoaderData() {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return useRouteLoaderData<typeof loader>("root")!;
}

export const shouldRevalidate: ShouldRevalidateFunction = ({ formMethod }) =>
  !!formMethod;

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <Meta />
        <Links />
        <script
          defer
          data-domain="shenzhengo.net"
          src="https://analytics.kapui.net/js/script.js"
        ></script>
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { environment, featureCtl } = useLoaderData<typeof loader>();
  const location = useLocation();

  // Create a singleton GrowthBook instance for this page
  const growthBook = useMemo(
    () =>
      new GrowthBook({
        apiHost: featureCtl.apiHost,
        clientKey: featureCtl.clientKey,
        // decryptionKey: featureCtl.decryptionKey,
        remoteEval: true,
        enableDevMode: environment === "development",
        trackingCallback: (experiment, result) => {
          console.log("Viewed Experiment", {
            experimentId: experiment.key,
            variationId: result.key,
          });
        },
        // Targeting attributes
        attributes: {},
      }).initSync({
        payload: featureCtl.payload as FeatureApiResponse,
        // Optional, enable streaming updates
        streaming: true,
      }),
    [featureCtl, environment],
  );
  useEffect(() => {
    growthBook.setURL(location.pathname);
  }, [growthBook, location.pathname]);

  return (
    <GrowthBookProvider growthbook={growthBook}>
      <TooltipProvider>
        <Outlet />
      </TooltipProvider>
    </GrowthBookProvider>
  );
}
