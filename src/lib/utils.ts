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