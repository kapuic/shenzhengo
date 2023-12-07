import { type LoaderFunction, type MetaFunction } from "@remix-run/cloudflare";

export interface RouteHandle {
  backButtonLabel?: string;
}

export function mergeMeta<
  Loader extends LoaderFunction | unknown = unknown,
  ParentsLoaders extends Record<string, LoaderFunction | unknown> = Record<
    string,
    unknown
  >,
>(
  meta: MetaFunction<Loader, ParentsLoaders>,
): MetaFunction<Loader, ParentsLoaders> {
  return (args) => {
    const mergedMeta = [];
    const overrides = [
      ...args.matches.flatMap((match) => match.meta ?? []),
      ...meta(args),
    ];

    for (const override of overrides) {
      let index = mergedMeta.findIndex(
        (meta) =>
          ("name" in meta &&
            "name" in override &&
            meta.name === override.name) ||
          ("property" in meta &&
            "property" in override &&
            meta.property === override.property) ||
          ("title" in meta && "title" in override),
      );
      if (index === -1) mergedMeta.push(override);
      else mergedMeta.splice(index, 1, override);
    }

    return mergedMeta;
  };
}
