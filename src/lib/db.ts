import { leftpad, sortByLatestFirst, shuffle, sortLatestPosts } from "./utils";
import * as printProducts from "./printProducts";
import * as fitzPrintOptions from "./fitzPrintOptions";
import * as printfulPrintOptions from "./printfulPrintOptions";
import * as blogPosts from "./blogPosts";
import { IDB, IPrint, IPrintOption, IPrintOptionSize, IPost, Printer } from "./types";
import moment from "moment";

const data: IDB = {
  posts: blogPosts.data,
  prints: transformPrints(printProducts.data),
};

export async function getDb(): Promise<IDB> {
  return Promise.resolve(data);
}

export function getPrint(db: IDB, id?: string): IPrint {
  var p = db.prints.find(p => p.id == id);
  if (p == null) throw new Error(`Could not find product with id ${id}`);

  return p;
}

export function getPost(db: IDB, id: string): IPost {
  var p = db.posts.find(p => p.id == id);
  if (p == null) throw new Error("Post not found by id: " + id);

  return p;
}

export const latestPrints = (db: IDB) => sortByLatestFirst(db.prints).slice(0, 12);

export const featuredPrints = (db: IDB) => shuffle(db.prints.filter(p => p.featured)).slice(0, 12);

export const latestPosts = (db: IDB) => sortLatestPosts(db.posts).slice(0, 6);

export async function getFirstPrint(): Promise<IPrint> {
  return (await getDb()).prints[0];
}

export function getPrintOptionOrDefault(
  product: IPrint,
  printer?: Printer,
  optionId?: string
): IPrintOption {
  if (optionId == null) return product.printOptions.fitzgeralds[0];

  if (!printer) printer = "fitzgeralds";

  var option = product.printOptions[printer].find(o => o.id == optionId);
  return option || product.printOptions[printer][0];
}

export function getPrintSizeOrDefault(option: IPrintOption, sizeId?: string): IPrintOptionSize {
  if (sizeId == null) return option.sizes[0];

  var size = option.sizes.find(s => s.id == sizeId);
  return size || option.sizes[0];
}

function transformPrints(prints: Partial<IPrint>[]): IPrint[] {
  return prints.map((p, i) => ({
    id: `AU${leftpad(i, "0000")}-${(p.title || "").split(" ").join("-")}`.toLocaleLowerCase(),
    title: p.title || "",
    description: p.description || "",
    image: p.image || `/images/products/full/${(p.title + "").split(" ").join("-")}.jpg`,
    thumb: p.thumb || `/images/products/thumb/${(p.title + "").split(" ").join("-")}.jpg`,
    printOptions: p.printOptions || {
      fitzgeralds: fitzPrintOptions.data,
      printful: printfulPrintOptions.data,
    },
    featured: p.featured || false,
    dateCreated: p.dateCreated || moment().format(),
    gps: p.gps,
  }));
}
