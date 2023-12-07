// @ts-check
import million from "million/compiler";
import { withEsbuildOverride } from "remix-esbuild-override";
import { flatRoutes } from "remix-flat-routes";

withEsbuildOverride((option) => {
  option.legalComments = "none";
  option.inject =
    process.env.NODE_ENV === "development" ? ["app/entry.dev.ts"] : undefined;
  option.plugins = [...option.plugins, million.esbuild({ auto: true })];
  return option;
});

/** @type {import("@remix-run/dev").AppConfig} */
export default {
  ignoredRouteFiles: ["**/.*"],
  server: "./server.ts",
  serverBuildPath: "functions/[[path]].js",
  serverConditions: ["workerd", "worker", "browser"],
  serverDependenciesToBundle: "all",
  serverMainFields: ["browser", "module", "main"],
  serverMinify: true,
  serverModuleFormat: "esm",
  serverPlatform: "neutral",
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  tailwind: true,
  routes: async (defineRoutes) => {
    return flatRoutes("routes", defineRoutes);
  },
};
