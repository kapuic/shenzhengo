import { type Range } from "./schema";

const ranges: Range[] = [
  {
    id: "shenzhen",
    name: "Shenzhen",

    zoom: 11.5,

    branding: {
      appName: "ShenzhenGo",
    },
  },
  {
    id: "yantian",
    name: "Yantian",

    zoom: 13,
    showChildren: true,

    parentId: "shenzhen",
  },
  {
    id: "meisha",
    name: "Meisha",

    branding: {
      appName: "MeishaGo",
    },

    parentId: "yantian",
  },
  {
    id: "shatoujiao",
    name: "Shatoujiao",

    parentId: "yantian",
  },
];

export default ranges;
