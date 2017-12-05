export enum ProductType
{
    Print
}

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
    image:string;
    title: string,
    type: ProductType,
    description: string
}

export interface IDB
{
    posts: IPost[],
    products: IProduct[]
}