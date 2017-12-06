import { IProduct, IPost } from "./types";
import * as moment from "moment";

export function leftpad(num: number, pad: string = "0000"): string {
    var str = "" + num
    return pad.substring(0, pad.length - str.length) + str;
}

// export function getJsonFile<T>(path: string): Promise<T> {
//     return new Promise<T>((resolve, reject) => {
        
//         fs.readFile(path, 'utf8', function (err, data) {
//             if (err) 
//             {
//                 reject(err);
//                 return;
//             }               

//             console.log("loaded", {path, data, err})

//             resolve(JSON.parse(data) as T);
//         });
//     });
// }

export function sortLatest(products:IProduct[])
{
    return products.sort((a,b) => moment(b.dateCreated).diff(moment(a.dateCreated).utc()))
}

export function sortLatestPosts(products:IPost[])
{
    return products.sort((a,b) => moment(b.dateCreated).diff(moment(a.dateCreated).utc()))
}

export function sortOldest(products:IProduct[])
{
    return products.sort((a,b) => moment(a.dateCreated).diff(moment(b.dateCreated).utc()))
}

export function shuffle<T>(arr:T[]) : T[]
{
    return arr.sort(() => Math.random() - 0.5);
}