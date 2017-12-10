import * as csvtojson from "csvtojson";
import { IProduct, IPrintOption } from '../lib/types';
//import * as sharp from 'sharp';

interface ICSVRow
{
    Product: string;
    Width: string;
    Height: string;
    "Fitz Price": string;
    "My Price": string;
    Ratio: string;
    Area: string;
}

interface IProdMappings {
    [details: string] : { id:string, name:string };
} 

const prodMapping : IProdMappings = {
    "Metallic": { id:"photo-paper-poster", name:"Photo Paper Poster" },
    "Canvas": { id:"canvas", name:"Canvas" },
    "Matboard": { id:"matboard", name:"Matboard" },
    "Alumalux": { id:"alumalux", name:"Alumalux" },
    "Standard Frame": { id:"photo-paper-framed", name:"Photo Paper Framed" },
    "Framed": { id:"photo-paper-framed", name:"Photo Paper Framed" },
};

interface IOptions
{
    [details: string] : IPrintOption;
}

async function run() 
{
    const csvPath = `${__dirname}/../data/Above Under Pricing - Fitz Pricing.csv`;
    var options : IOptions = {};

    console.log(`Importing CSV from: ${csvPath}`);
    csvtojson()
        .fromFile(csvPath)
        .on('json', (json:ICSVRow) => {

            var mapping = prodMapping[json.Product];
            if (!(options as Object).hasOwnProperty(mapping.id))
            {
                options[mapping.id] = {
                    id: prodMapping[json.Product].id,
                    name: prodMapping[json.Product].name,
                    sizes: []
                }
            }
            else
            {
                options[mapping.id].sizes.push({
                    id: `${json.Width}x${json.Height}`,
                    widthInches: parseInt(json.Width),
                    heightInches: parseInt(json.Height),
                    priceAUD: parseFloat(json["My Price"]),
                })
            }
        })
        .on('done', async (error:any)=>{
            
        });
}

run();