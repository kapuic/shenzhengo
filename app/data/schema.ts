export interface BrandingOptions {
  appName: string;
  appIconsPath: string;
}

export interface Category {
  id: string;
  name: string;
  colors: {
    light: string;
    dark: string;
  };
  /** Defaults to `"other"`. */
  markerIcon?: string;
  parentId?: string;
}

export interface Range {
  id: string;
  name: string;

  description?: string;

  /** Defaults to `15`. */
  zoom?: number;
  /** Defaults to `[11, 18]`. */
  zooms?: [number, number];

  branding?: Partial<BrandingOptions>;

  parentId?: string;
  /** Defaults to `false`. */
  showChildren?: boolean;
}

export interface Place {
  location: [number, number];

  name: string;
  originalName?: string;
  rangeId: Range["id"];
  categoryId: Category["id"];

  description?: string;
  coverImage?: `/images/${string}/cover.${string}`;

  signatureDishes?: {
    name: string;
    originalName?: string;
    price?: number;
    image: `/images/${string}/${number}.${string}`;
  }[];

  streetViewUrl?:
    | `https://map.baidu.com/#panoid=${string}&panotype=street&heading=${number}&pitch=${number}&l=${number}&psp=%7B%22PanoModule%22%3A%7B%22markerUid%22%3A%22${string}%22%7D%7D`
    | `https://map.baidu.com/#panoid=${string}&panotype=street&heading=${number}&pitch=${number}&l=${number}`;

  authors?: string | string[];
}

export interface Activity {
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
