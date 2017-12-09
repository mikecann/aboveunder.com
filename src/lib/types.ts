export enum ProductType
{
    Print
}

export interface IPost
{
    id: string,
    title: string,
    headerImage: string;
    tags: string[],
    category: string;
    summary: string,
    markdownFileName: string;
    dateCreated: string,
}

export interface IProduct
{
    id: string,
    image:string;
    thumb:string;
    title: string,
    featured: boolean,
    type: ProductType,
    description: string,
    dateCreated: string,
    printOptions: IPrintOption[]
}

export interface IPrintOption
{
    id:string,
    name: string;
    sizes: IPrintOptionSize[]
}

export interface IPrintOptionSize
{
    id:string,
    widthInches: number,
    heightInches: number,
    priceAUD: number
}

export interface IDB
{
    posts: IPost[],
    products: IProduct[]
}