import {leftpad} from "./utils"
import * as printProducts from "./printProducts";
import * as defaultPrintOptions from "./defaultPrintOptions";
import * as blogPosts from "./blogPosts";
import { IDB, IPrint, IPrintOption, IPrintOptionSize } from "./types";
import * as moment from "moment"

const data : IDB = {
    posts: blogPosts.data,
    products: transformPrints(printProducts.data)
}

export async function getDb() : Promise<IDB>
{
    return Promise.resolve(data);
}

export async function getPrint(id:string) : Promise<IPrint>
{
    var p = data.products.find(p => p.id == id);
    if (p==null)
        throw new Error(`Could not find product with id ${id}`);

    return Promise.resolve(p);
}

export async function getFirstPrint() : Promise<IPrint>
{
    return (await getDb()).products[0];
}

export function getPrintOptionOrDefault(product:IPrint, optionId?:string) : IPrintOption
{
    if (optionId == null)
        return product.printOptions[0];

    var option = product.printOptions.find(o => o.id == optionId);
    return option ||  product.printOptions[0];
}

export function getPrintSizeOrDefault(option:IPrintOption, sizeId?:string) : IPrintOptionSize
{
    if (sizeId==null)
        return option.sizes[0];
    
    var size = option.sizes.find(s => s.id == sizeId);
    return size || option.sizes[0];
}

function transformPrints(prints:Partial<IPrint>[]) : IPrint[]
{
    return prints.map((p,i) => ({
        id: `AU${leftpad(i,"0000")}-${(p.title || "").split(" ").join("-")}`.toLocaleLowerCase(),
        title: p.title || "",
        description: p.description || "",
        image: p.image || "",
        thumb: p.thumb || "",
        printOptions: p.printOptions || defaultPrintOptions.data,
        featured: p.featured || false,
        dateCreated: p.dateCreated || moment().format()
    }));
}