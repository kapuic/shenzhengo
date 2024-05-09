export interface BrandingOptions {
  appName: string;
  appIconsPath: string;
}

export interface Category {
  id: string;
  name: string;
  markerUrl: string;
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
  coverImage?: string;

  signatureDishes?: {
    name: string;
    originalName?: string;
    price?: number;
    image: string;
  }[];

  streetViewUrl?: string;

  authors?: string | string[];
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
