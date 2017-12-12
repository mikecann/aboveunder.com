"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const csvtojson = require("csvtojson");
const fs = require("fs");
const path = require("path");
const request = require("request");
//import * as sharp from 'sharp';
const Jimp = require("jimp");
const moment = require("moment");
async function run() {
    const csvPath = `${__dirname}/../data/wpProducts.csv`;
    const tsPath = `${__dirname}/../src/lib/printProducts.ts`;
    var products = [];
    console.log(`Importing CSV from: ${csvPath}`);
    csvtojson()
        .fromFile(csvPath)
        .on('json', (json) => {
        var product = {
            title: json.post_title.substr(9),
            image: json.image,
            description: json.post_excerpt,
            featured: json._featured == "yes",
            dateCreated: json.post_date
        };
        products.push(product);
    })
        .on('done', async (error) => {
        try {
            var i = 0;
            const step = 3;
            while (i < products.length) {
                await loadProductImagesParallel(products.slice(i, i + step));
                i += step;
            }
            console.log(`Generating ${products.length} thumnails..`);
            for (var product of products)
                await generateThumbnail(product);
            products = products.sort((a, b) => moment(a.dateCreated).diff(moment(b.dateCreated).utc()));
            if (error)
                throw error;
            fs.writeFileSync(tsPath, `export const data = ${JSON.stringify(products, null, 2)}`);
        }
        catch (e) {
            console.error("Whoops, error!", e);
        }
    });
}
async function loadProductImagesParallel(products) {
    await Promise.all(products.map(p => loadProductImage(p)));
}
async function generateThumbnail(product) {
    const fname = path.basename(product.image + "");
    const fullPath = `${__dirname}/..${product.image}`;
    const thumbPath = `${__dirname}/../static/images/products/thumb/${fname}`;
    if (!fs.existsSync(thumbPath)) {
        console.log("Generating thumb for: ", product);
        var img = await Jimp.read(fullPath);
        img.resize(800, Jimp.AUTO);
        img.quality(65);
        await writeImage(img, thumbPath);
    }
    product.thumb = `/static/images/products/thumb/${fname}`;
}
async function writeImage(img, path) {
    return new Promise((resolve, reject) => {
        console.log("writing..");
        img.write(path, err => {
            if (err)
                reject(err);
            else
                resolve();
        });
    });
}
async function loadProductImage(product) {
    const fname = path.basename(product.image + "");
    const fpath = `static/images/products/full/${fname}`;
    if (!fs.existsSync(fpath)) {
        console.log('Downloading.. ', fname);
        await downloadImg(`https://aboveunder.com${product.image}`, fpath);
    }
    product.image = `/${fpath}`;
}
function downloadImg(uri, filename) {
    return new Promise((resolve, reject) => {
        request.head(uri, function (err, res, body) {
            console.log("Downloading ", { uri });
            request(uri).pipe(fs.createWriteStream(filename)).on('close', () => resolve());
        });
    });
}
;
run();
