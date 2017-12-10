"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const csvtojson = require("csvtojson");
//import * as sharp from 'sharp';
async function run() {
    const csvPath = `${__dirname}/../data/Above Under Pricing - Fitz Pricing.csv.csv`;
    var products = [];
    console.log(`Importing CSV from: ${csvPath}`);
    csvtojson()
        .fromFile(csvPath)
        .on('json', (json) => {
        console.log("json", json);
        //products.push(product);
    })
        .on('done', async (error) => {
    });
}
