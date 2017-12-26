import * as path from "path";
import { IPrint } from "../src/lib/types";
import * as Jimp from "jimp";
import { getDb } from "../src/lib/db";

async function run()
{
    var db = await getDb();
    for(var p of db.prints.slice(db.prints.length-10,db.prints.length))
        await generateThumbnail(p);
}

async function generateThumbnail(product:Partial<IPrint>) : Promise<void>
{
    const fname = path.basename(product.image + "");
    const fullPath = `./public${product.image}`;
    const thumbPath = `./public/images/products/thumb/${fname}`;

    console.log("Generating thumb for: ",product.title);

    var img = await Jimp.read(fullPath);
    img.resize(800, Jimp.AUTO);
    img.quality(65);
    await writeImage(img, thumbPath);
}

async function writeImage(img:Jimp, path:string) : Promise<any>
{
    return new Promise((resolve,reject) => {
        console.log("writing..")
        img.write(path, err => {
            if (err)
                reject(err);
            else
                resolve();
        });
    })
}

run();
