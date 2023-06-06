import { type Place } from "~/routes/_app/types";

export function getDirectionsUrl(place: Place) {
  const url = new URL("https://www.amap.com/dir");

  url.searchParams.append("to[name]", place.name);
  url.searchParams.append("to[id]", "menuto");
  url.searchParams.append("to[poitype]", "");
  url.searchParams.append("to[lnglat]", place.location.join(","));
  url.searchParams.append("to[modxy]", "");
  url.searchParams.append("type", "walk");
  url.searchParams.append("policy", "1");

  return url;
}
