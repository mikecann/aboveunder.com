import {leftpad} from "./utils"
import * as printProducts from "./printProducts";
import { IDB, IProduct, ProductType } from "./types";

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
        description: p.description || ""
    }));
}

const data : IDB = {
    posts: [
        {
            "userId": 1,
            "id": 1,
            "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            "body": "mike is the best"
        }
    ],
    products: transformProducts(printProducts.data)
}