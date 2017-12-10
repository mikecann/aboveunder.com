"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const csvtojson = require("csvtojson");
const prodMapping = {
    "Metallic": { id: "photo-paper-poster", name: "Photo Paper Poster" },
    "Canvas": { id: "canvas", name: "Canvas" },
    "Matboard": { id: "matboard", name: "Matboard" },
    "Alumalux": { id: "alumalux", name: "Alumalux" },
    "Standard Frame": { id: "photo-paper-framed", name: "Photo Paper Framed" },
    "Framed": { id: "photo-paper-framed", name: "Photo Paper Framed" },
};
async function run() {
    const csvPath = `${__dirname}/../data/Above Under Pricing - Fitz Pricing.csv`;
    var options = {};
    console.log(`Importing CSV from: ${csvPath}`);
    csvtojson()
        .fromFile(csvPath)
        .on('json', (json) => {
        var mapping = prodMapping[json.Product];
        if (!options.hasOwnProperty(mapping.id)) {
            options[mapping.id] = {
                id: prodMapping[json.Product].id,
                name: prodMapping[json.Product].name,
                sizes: []
            };
        }
        else {
            options[mapping.id].sizes.push({
                id: `${json.Width}x${json.Height}`,
                widthInches: parseInt(json.Width),
                heightInches: parseInt(json.Height),
                priceAUD: parseFloat(json["My Price"]),
            });
        }
    })
        .on('done', async (error) => {
    });
}
run();
