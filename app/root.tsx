import { type LinksFunction } from "@remix-run/cloudflare";
import { cssBundleHref } from "@remix-run/css-bundle";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

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

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width,initial-scale=1" name="viewport" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
