export interface IPost {
  id: string;
  title: string;
  headerImage: string;
  thumbImage: string;
  tags: string[];
  category: string;
  summary: string;
  markdownFileName: string;
  dateCreated: string;
}

export interface IPrint {
  id: string;
  image: string;
  thumb: string;
  title: string;
  gps?: google.maps.LatLngLiteral;
  featured: boolean;
  description: string;
  dateCreated: string;
  printOptions: IPrintOptions;
}

export type Printer = "printful" | "fitzgeralds";

export interface IPrintOptions {
  printful: IPrintOption[];
  fitzgeralds: IPrintOption[];
}

export interface IPrintOption {
  id: string;
  name: string;
  sizes: IPrintOptionSize[];
}

export interface IPrintOptionSize {
  id: string;
  widthInches: number;
  heightInches: number;
  priceAUD: number;
  weight: number;
  meta?: any;
}

export interface IDB {
  posts: IPost[];
  prints: IPrint[];
}
