import * as csvtojson from "csvtojson";
import * as fs from "fs";
import * as path from "path";
import * as request from "request";
import { IPrint } from "../lib/types";
//import * as sharp from 'sharp';
import * as Jimp from "jimp";
import * as moment from "moment";

async function run() 
{
    const csvPath = `${__dirname}/../data/wpProducts.csv`;
    const tsPath = `${__dirname}/../src/lib/printProducts.ts`;
    var products : Partial<IPrint>[] = [];

    console.log(`Importing CSV from: ${csvPath}`);
    csvtojson()
        .fromFile(csvPath)
        .on('json', (json:any) => {

            var product : Partial<IPrint> = {
                title: (json.post_title as string).substr(9),
                image: json.image,
                description: json.post_excerpt,
                featured: json._featured == "yes",
                dateCreated: json.post_date
            };

            products.push(product);
        })
        .on('done', async (error:any)=>{

            try
            {
                var i = 0;
                const step = 3;
    
                while(i<products.length)
                {
                    await loadProductImagesParallel(products.slice(i, i+step)); 
                    i += step;
                }
    
                console.log(`Generating ${products.length} thumnails..`)
                
                for(var product of products)
                    await generateThumbnail(product)

                products = products.sort((a,b) => moment(a.dateCreated).diff(moment(b.dateCreated).utc()));
                
                if (error)
                    throw error;

                fs.writeFileSync(tsPath, `export const data = ${JSON.stringify(products, null, 2)}`)
            }
            catch(e)
            {
                console.error("Whoops, error!", e);
            }
        });
}

async function loadProductImagesParallel(products:Partial<IPrint>[])
{
    await Promise.all(products.map(p => loadProductImage(p)))
}

async function generateThumbnail(product:Partial<IPrint>) : Promise<void>
{
    const fname = path.basename(product.image + "");
    const fullPath = `${__dirname}/..${product.image}`;
    const thumbPath = `${__dirname}/../static/images/products/thumb/${fname}`;

    if (!fs.existsSync(thumbPath))
    {
        console.log("Generating thumb for: ",product);

        var img = await Jimp.read(fullPath);
        img.resize(800, Jimp.AUTO);
        img.quality(65);
        await writeImage(img, thumbPath);
    }

    product.thumb = `/static/images/products/thumb/${fname}`;
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

async function loadProductImage(product:Partial<IPrint>)
{
    const fname = path.basename(product.image + "");
    const fpath = `static/images/products/full/${fname}`;
    if (!fs.existsSync(fpath))
    {
        console.log('Downloading.. ', fname);    
        await downloadImg(`https://aboveunder.com${product.image}`, fpath);        
    }
    product.image = `/${fpath}`;
}

function downloadImg(uri:string, filename:string) : Promise<any> {

    return new Promise<any>((resolve,reject) => {
        request.head(uri, function(err:any, res:any, body:any){   
            console.log("Downloading ", {uri})
            request(uri).pipe(fs.createWriteStream(filename)).on('close', () => resolve());
          });
    });
  };

run();