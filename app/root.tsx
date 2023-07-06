import { GrowthBook, GrowthBookProvider } from "@growthbook/growthbook-react";
import {
  json,
  type LinksFunction,
  type LoaderArgs,
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
} from "@remix-run/react";
import { useEffect, useMemo } from "react";

import tailwind from "~/tailwind.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwind },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  // { rel: "icon", href: "/icons/favicon.ico", type: "image/png" },
  // { rel: "icon", href: "/icons/favicon.svg", type: "image/svg+xml" },
  // {
  //   rel: "icon",
  //   href: "/icons/favicon-16x16.png",
  //   sizes: "16x16",
  //   type: "image/png",
  // },
  // {
  //   rel: "icon",
  //   href: "/icons/favicon-32x32.png",
  //   sizes: "32x32",
  //   type: "image/png",
  // },
  // {
  //   rel: "mask-icon",
  //   href: "/icons/mask-icon.svg",
  //   color: "#1e90ff",
  //   type: "image/svg+xml",
  // },
  // ...["60", "76", "120", "152", "180"].map((size) => ({
  //   rel: "apple-touch-icon",
  //   href: `/icons/apple-touch-icon-${size}x${size}.png`,
  //   sizes: `${size}x${size}`,
  //   type: "image/png",
  // })),
];

export async function loader({ context }: LoaderArgs) {
  return json({
    featureCtl: {
      apiHost: context.env.GROWTHBOOK_API_HOST,
      clientKey: context.env.GROWTHBOOK_CLIENT_KEY,
    },
  });
}

export const shouldRevalidate: ShouldRevalidateFunction = ({ formMethod }) =>
  !!formMethod;

export default function App() {
  const location = useLocation();
  const { featureCtl } = useLoaderData<typeof loader>();

  const growthBook = useMemo(
    () =>
      new GrowthBook({
        apiHost: featureCtl.apiHost,
        clientKey: featureCtl.clientKey,
        enableDevMode: process.env.NODE_ENV === "development",
      }),
    [featureCtl.apiHost, featureCtl.clientKey]
  );
  useEffect(() => {
    growthBook.loadFeatures({ autoRefresh: true });
  }, [growthBook]);
  useEffect(
    () => growthBook.setURL(location.pathname),
    [growthBook, location.pathname]
  );

  return (
    <GrowthBookProvider growthbook={growthBook}>
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta content="width=device-width,initial-scale=1" name="viewport" />
          <Meta />
          <Links />
          <script
            defer
            data-domain="meishago.kapui.net"
            src="https://analytics.kapui.net/js/script.js"
          />
        </head>
        <body>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    </GrowthBookProvider>
  );
}
