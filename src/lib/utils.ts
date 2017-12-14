import { IPrint, IPost } from "./types";
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

export function sortLatest(products:IPrint[])
{
    return products.sort((a,b) => moment(b.dateCreated).diff(moment(a.dateCreated).utc()))
}

export function sortLatestPosts(products:IPost[])
{
    return products.sort((a,b) => moment(b.dateCreated).diff(moment(a.dateCreated).utc()))
}

export function sortOldest(products:IPrint[])
{
    return products.sort((a,b) => moment(a.dateCreated).diff(moment(b.dateCreated).utc()))
}

export function shuffle<T>(arr:T[]) : T[]
{
    return arr.sort(() => Math.random() - 0.5);
}

export function getMyRoundedPrice(price:number) : number
{
    if (price<100)
        return Math.round(price);
    
    return Math.ceil(Math.round(price) / 10)*10
}

export function areEqual<T>(a:T[], b:T[])
{
    if (a.length!=b.length)
        return false;
    
    for(var i=0; i<a.length; i++)
        if (a[i]!=b[i])
            return false;

    return true;
}