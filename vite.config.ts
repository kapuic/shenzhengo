import mdx from "@mdx-js/rollup";
import {
  cloudflareDevProxyVitePlugin as remixCloudflareDevProxy,
  vitePlugin as remix,
} from "@remix-run/dev";
import { type ConfigRoute } from "@remix-run/dev/dist/config/routes";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { flatRoutes } from "remix-flat-routes";
import { defineConfig } from "vite";
import babel from "vite-plugin-babel";
import tsconfigPaths from "vite-tsconfig-paths";

function normalizeRouteId(routeId: string, isIndex?: boolean | undefined) {
  const segments = routeId.split(/[/.]/);
  for (let i = 0; i < segments.length; i++)
    if (segments[i].endsWith("+")) segments[i] = segments[i].slice(0, -1);
  if (segments.slice(-1)[0] === "index") {
    if (!isIndex) segments.pop();
  } else if (isIndex) segments.push("index");
  return segments.join(".");
}

export default defineConfig({
  plugins: [
    remixCloudflareDevProxy(),
    mdx({
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm],
    }),
    remix({
      routes: async (defineRoutes) => {
        const rawEntries = Object.entries(flatRoutes("routes", defineRoutes));
        // Normalize route IDs.
        const entries = rawEntries.map<[string, ConfigRoute]>(
          ([rawId, route]) => {
            const id = normalizeRouteId(rawId, route.index);
            route.id = id;
            if (route.parentId)
              route.parentId = normalizeRouteId(route.parentId);
            return [id, route];
          },
        );
        // Fix pages in flat file folders (routes/.../folder+/page.index.ts) having incorrect `parentId`s of `root`.
        for (const [id, route] of entries) {
          // Notice that since `entries.id` has been normalized, we will check a nested page by the number of segments instead of `+` in its ID.
          // - if (!id.includes("+")) continue;
          const components = id.split(".");
          if (route.parentId !== "root" || components.length <= 2) continue;
          if (components.slice(-1)[0] === "index") components.pop();
          route.path = components.slice(-1)[0];
          const parentId = components.slice(0, -1).join(".");
          if (!entries.some(([id]) => id === parentId))
            throw new Error(`No parent route found for ${id}`);
          route.parentId = parentId;
        }
        return Object.fromEntries(entries);
      },
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        unstable_singleFetch: true,
      },
    }),
    babel({
      filter: /\.[jt]sx?$/,
      babelConfig: {
        presets: ["@babel/preset-typescript"],
        plugins: [["babel-plugin-react-compiler", {}]],
      },
    }),
    tsconfigPaths(),
  ],
  esbuild: { legalComments: "none" },
  build: { cssMinify: "lightningcss" },
  ssr: {
    optimizeDeps: {
      include: ["lodash"],
    },
    noExternal: [
      "@growthbook/growthbook-react",
      "@growthbook/growthbook",
      "lodash",
    ],
  },
  server: {
    fs: {
      // Restrict files that could be served by Vite's dev server.  Accessing
      // files outside this directory list that aren't imported from an allowed
      // file will result in a 403.  Both directories and files can be provided.
      // If you're comfortable with Vite's dev server making any file within the
      // project root available, you can remove this option.  See more:
      // https://vitejs.dev/config/server-options.html#server-fs-allow
      allow: ["app"],
    },
  },
});
