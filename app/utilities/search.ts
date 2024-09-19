import Fuse from "fuse.js";

import { type Place } from "~/data/schema";

export function getFuseClient(places: Place[]) {
  return new Fuse(places, {
    keys: [
      { name: "name", weight: 0.7 },
      { name: "originalName", weight: 0.7 },
      { name: "description", weight: 0.3 },
    ],
  });
}
