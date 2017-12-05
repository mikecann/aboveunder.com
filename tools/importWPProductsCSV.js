"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const csvtojson = require("csvtojson");
const fs = require("fs");
async function run() {
    const csvPath = `${__dirname}/../data/wpProducts.csv`;
    const jsonPath = `${__dirname}/../src/lib/printProducts.ts`;
    const products = [];
    console.log(`Importing CSV from: ${csvPath}`);
    csvtojson()
        .fromFile(csvPath)
        .on('json', (json) => {
        // combine csv header row and csv line to a json object
        // jsonObj.a ==> 1 or 4
        console.log("json", json);
        products.push({
            title: json.post_title.substr(9),
            image: json.image,
            description: json.post_excerpt
        });
    })
        .on('done', async (error) => {
        if (!error)
            fs.writeFileSync(jsonPath, `export const data = ${JSON.stringify(products, null, 2)}`);
    });
}
run();
