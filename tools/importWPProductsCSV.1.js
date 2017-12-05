"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const csvtojson = require("csvtojson");
const fs = require("fs");
const path = require("path");
const request = require("request");
async function run() {
    const csvPath = `${__dirname}/../data/wpProducts.csv`;
    const jsonPath = `${__dirname}/../src/lib/printProducts.ts`;
    var products = [];
    console.log(`Importing CSV from: ${csvPath}`);
    csvtojson()
        .fromFile(csvPath)
        .on('json', (json) => {
        //console.log("json", json);
        var product = {
            title: json.post_title.substr(9),
            image: json.image,
            description: json.post_excerpt
        };
        products.push(product);
    })
        .on('done', async (error) => {
        var i = 0;
        const step = 3;
        while (i < products.length) {
            await loadProductImagesParallel(products.slice(i, i + step));
            i += step;
        }
        if (!error)
            fs.writeFileSync(jsonPath, `export const data = ${JSON.stringify(products, null, 2)}`);
    });
}
async function loadProductImagesParallel(products) {
    await Promise.all(products.map(p => loadProductImage(p)));
}
async function loadProductImage(product) {
    const fname = path.basename(product.image + "");
    const fpath = `static/images/products/full/${fname}`;
    if (!fs.existsSync(fpath)) {
        console.log('Downloading.. ', fname);
        await downloadImg(`http://aboveunder.com${product.image}`, fpath);
    }
    product.image = `/${fpath}`;
}
function downloadImg(uri, filename) {
    return new Promise((resolve, reject) => {
        request.head(uri, function (err, res, body) {
            request(uri).pipe(fs.createWriteStream(filename)).on('close', () => resolve());
        });
    });
}
;
run();
