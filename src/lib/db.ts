import {leftpad} from "./utils"
import * as printProducts from "./printProducts";
import * as defaultPrintOptions from "./defaultPrintOptions";
import * as blogPosts from "./blogPosts";
import { IDB, IProduct, ProductType } from "./types";
import * as moment from "moment"

const data : IDB = {
    posts: blogPosts.data,
    products: transformProducts(printProducts.data)
}

export async function getDb() : Promise<IDB>
{
    return Promise.resolve(data);
}

export async function getProduct(id:string) : Promise<IProduct>
{
    var p = data.products.find(p => p.id == id);
    if (p==null)
        throw new Error(`Could not find product with id ${id}`);

    return Promise.resolve(p);
}

function transformProducts(products:Partial<IProduct>[]) : IProduct[]
{
    return products.map((p,i) => ({
        id: `AU${leftpad(i,"0000")}-${(p.title || "").split(" ").join("-")}`.toLocaleLowerCase(),
        title: p.title || "",
        type: p.type || ProductType.Print,
        description: p.description || "",
        image: p.image || "",
        thumb: p.thumb || "",
        printOptions: p.printOptions || defaultPrintOptions.data,
        featured: p.featured || false,
        dateCreated: p.dateCreated || moment().format()
    }));
}