"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const csvtojson = require("csvtojson");
const db_1 = require("../lib/db");
async function run() {
    const path = `${__dirname}/../data/wpProducts.csv`;
    const products = [];
    console.log(`Importing CSV from: ${path}`);
    csvtojson()
        .fromFile(path)
        .on('json', (json) => {
        // combine csv header row and csv line to a json object
        // jsonObj.a ==> 1 or 4
        console.log("json", json);
        products.push({
            id: "",
            title: json.post_title,
            description: json.post_excerpt,
            type: db_1.ProductType.Print
        });
    })
        .on('done', (error) => {
        console.log('end', { error, products });
    });
}
run();
