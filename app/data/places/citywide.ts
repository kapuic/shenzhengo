import { type Place } from "~/routes/_app/types";

import { PointOfInterestType } from "../types";

const placesCitywide: Place[] = [
  {
    location: [114.239208, 22.553136],
    name: "壹海城",
    translation: "One City",
    type: PointOfInterestType.ShoppingMall,
    description: "A Yantian shopping mall.",
    author: "Rachel",
  },
  {
    location: [114.109696, 22.540133],
    name: "罗湖万象城",
    translation: "The MiXC",
    type: PointOfInterestType.ShoppingMall,
    description: "A Luohu shopping mall.",
    author: "Rachel",
  },
  {
    location: [114.054007, 22.533569],
    name: "COCO Park",
    translation: "COCO Park",
    type: PointOfInterestType.ShoppingMall,
    description: "A Futian shopping mall.",
    author: "Rachel",
  },
  {
    location: [113.935172, 22.517058],
    name: "海岸城",
    translation: "Coastal City",
    type: PointOfInterestType.ShoppingMall,
    description: "A Nanshan shopping mall.",
    author: "Rachel",
  },
];

export default placesCitywide;
