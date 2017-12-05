export interface IPost
{
    userId: number,
    id: number,
    title: string,
    body: string
}

export interface IProduct
{
    id: string
}

export interface IDB
{
    posts: IPost[],
    products: IProduct[]
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
    products: [
        {
            id: "abc"
        }
    ]
}

export async function getData()
{
    return Promise.resolve(data);
}