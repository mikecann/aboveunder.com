import {leftpad} from "./utils"

export interface IPost
{
    userId: number,
    id: number,
    title: string,
    body: string
}

export interface IProduct
{
    id: string,
    title: string,
    type: ProductType,
    description: string
}

export enum ProductType
{
    Print
}

export interface IDB
{
    posts: IPost[],
    products: IProduct[]
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
    products: transformProducts([
        {
            title: "Lucky Bay Horizontal",
            description: `Taken over Lucky Bay in Esperance, WA. 
            
            Esperance has without doubt some of the most beautiful beaches for done photography in the world, this is a prime example of that.`,
            type: ProductType.Print
        },
        {
            title: "Darwin Fish",
            description: `Taken in Darwin in the Northern Territory of Australia.
            
            Not exactly sure what these fish are, perhaps they are even the famous Barramundi.`,
            type: ProductType.Print
        },
        {
            title: "Port Douglas Stingray",
            description: `Taken near Port Douglas is Northern Queensland.
            
            There were quite a few of these guys swimming in the shallows around the town, I had to try to take a picture or two.`,
            type: ProductType.Print
        },
        {
            title: "Elliot River",
            description: `Taken at Elliot Heads, near Bundaberg in South Queensland.
            
            We stumbled across this spectacular little estuary but were sunned by how vibrant the blues were of the water when viewed from above.`,
            type: ProductType.Print
        }
    ])
}