import * as csvtojson from "csvtojson";
import * as fs from "fs";
import { IProduct } from "../lib/types";

async function run() 
{
    const csvPath = `${__dirname}/../data/wpProducts.csv`;
    const jsonPath = `${__dirname}/../src/lib/printProducts.ts`;
    const products : Partial<IProduct>[] = [];

    console.log(`Importing CSV from: ${csvPath}`);
    csvtojson()
        .fromFile(csvPath)
        .on('json', (json:any) => {
            // combine csv header row and csv line to a json object
            // jsonObj.a ==> 1 or 4
            console.log("json", json);

            products.push({
                title: (json.post_title as string).substr(9),
                image: json.image,
                description: json.post_excerpt
            })

        })
        .on('done', async (error:any)=>{

            



            if (!error)
                fs.writeFileSync(jsonPath, `export const data = ${JSON.stringify(products, null, 2)}`)
        });
}

run();
