import Fuse from "fuse.js";

import allPlaces from "~/data/places";

import { getPointOfInterestTypeName } from "./data";

const fusePlaces = new Fuse(
  allPlaces.map(({ type, ...other }) => ({
    type: getPointOfInterestTypeName(type),
    ...other,
  })),
  {
    keys: [
      { name: "name", weight: 0.7 },
      { name: "translation", weight: 0.7 },
      { name: "type", weight: 0.5 },
      { name: "keywords", weight: 0.5 },
      { name: "description", weight: 0.3 },
    ],
  },
);

export function searchPlaces(query: string) {
  return fusePlaces.search(query);
}
