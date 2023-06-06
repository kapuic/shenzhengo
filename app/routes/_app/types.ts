import { type PointOfInterestType } from "~/data/types";

export interface Place {
  location: [number, number];

  name: string;
  translation: string;
  type: PointOfInterestType;

  description?: string;
  cover_image?: string;
  keywords?: string[];

  signature_dishes?: {
    name: string;
    translation: string;
    price: number;
    image: string;
  }[];

  author?: string;
}

export interface Activity {
  id: string;
  name: string;

  associated_types?: PointOfInterestType[];
  associated_places?: [number, number][];

  vocab?: {
    name: string;
    chinese: string;
    pinyin: string;
  }[];
}
