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

export interface IPrint
{
    id: string,
    image:string;
    thumb:string;
    title: string,
    featured: boolean,
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
    priceAUD: number,
    weight: number;
}

export interface IDB
{
    posts: IPost[],
    products: IPrint[]
}