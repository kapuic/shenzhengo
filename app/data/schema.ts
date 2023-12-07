export interface Category {
  id: string;
  name: string;
  markerUrl: string;
  parentId?: string;
}

export interface Range {
  id: string;
  name: string;
}

export interface Place {
  location: [number, number];

  name: string;
  originalName: string;
  rangeId: Range["id"];
  categoryId: Category["id"];

  description?: string;
  coverImage?: string;

  signatureDishes?: {
    name: string;
    translation: string;
    price: number;
    image: string;
  }[];

  author?: string;
}

export interface Guide {
  id: string;
  name: string;

  categoryIds?: Category["id"][];
  placeLocations?: [number, number][];

  vocab?: {
    name: string;
    chinese: string;
    pinyin: string;
  }[];
}
