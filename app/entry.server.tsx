/**
 * By default, Remix will handle generating the HTTP Response for you. You are
 * free to delete this file if you'd like to, but if you ever want it revealed
 * again, you can run `npx remix reveal` ✨ For more information, see
 * https://remix.run/file-conventions/entry.server
 */

import { type AppLoadContext, type EntryContext } from "@remix-run/cloudflare";
import { RemixServer } from "@remix-run/react";
import isbot from "isbot";
import { renderToReadableStream } from "react-dom/server";

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  loadContext: AppLoadContext
) {
  const body = await renderToReadableStream(
    <RemixServer context={remixContext} url={request.url} />,
    {
      signal: request.signal,
      onError(error: unknown) {
        console.error(error);
        responseStatusCode = 500;
      },
    }
  );

  if (isbot(request.headers.get("user-agent"))) {
    await body.allReady;
  }

  // Functional Headers
  responseHeaders.set("Content-Type", "text/html");
  // responseHeaders.set("Accept-CH", "Sec-CH-Prefers-Color-Scheme");
  // responseHeaders.set("Vary", "Sec-CH-Prefers-Color-Scheme");
  // responseHeaders.set("Critical-CH", "Sec-CH-Prefers-Color-Scheme");

  // Security Headers
  responseHeaders.set(
    "Content-Security-Policy",
    `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://features-control.kapui.net https://analytics.kapui.net https://challenges.cloudflare.com https://webapi.amap.com; style-src 'self' 'unsafe-inline'; img-src 'self' https://webapi.amap.com https://vdata.amap.com https://*.is.autonavi.com; frame-src https://challenges.cloudflare.com; frame-ancestors 'none'; worker-src blob:; connect-src 'self' https://features-control.kapui.net https://analytics.kapui.net https://*.amap.com${
      process.env.NODE_ENV === "development" ? " *" : ""
    }`
  );
  responseHeaders.set("X-Frame-Options", "DENY");
  responseHeaders.set("X-Content-Type-Options", "nosniff");
  responseHeaders.set("X-XSS-Protection", "1; mode=block");
  responseHeaders.set("Referrer-Policy", "strict-origin-when-cross-origin");
  responseHeaders.set("Permissions-Policy", "interest-cohort=()");
  responseHeaders.set("Cross-Origin-Embedder-Policy", "credentialless");
  responseHeaders.set("Cross-Origin-Opener-Policy", "same-origin");
  responseHeaders.set("Cross-Origin-Resource-Policy", "same-origin");

  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
