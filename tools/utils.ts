import * as fs from "fs";
import {promisify} from 'util';
import * as readline from "readline";
import { getDb } from "../src/lib/db";
import { IPrint } from '../src/lib/types';
import { sortByLatestFirst, sortByOldestFirst, getDirectories } from '../src/lib/utils';
import * as path from "path";
import * as Jimp from "jimp";

export const publicDir = `./public`;
export const imagesDir = `./public/images`;
export const fullImageDir = `./public/images/products/full`;
export const thumbsImageDir = `./public/images/products/thumb`;

export const getFullImgPath = (imgName:string) => `${fullImageDir}/${imgName}`;
export const getThumbImgPath = (imgName:string) => `${thumbsImageDir}/${imgName}`;

export async function getFilesInDir(dir:string) : Promise<string[]>
{
    return await (promisify(fs.readdir))(dir);   
}

export async function askQuestion(question:string, defaultVal?:string) : Promise<string>
{
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    var q = defaultVal ? `${question} (${defaultVal})` : question;

    return new Promise<string>((resolve,reject) => {
        rl.question(q+" ", answer => {
            if (!answer && defaultVal)
                answer = defaultVal;

            rl.close();
            resolve(answer);
        })
    })
}

export async function askConfirmation(question:string) : Promise<boolean>
{
    var answer = await askQuestion(`${question} (Y/n)`);
    if (!answer)
        return true;

    return answer.toLowerCase() == "y";
}

export async function renameFile(from:string, to:string) : Promise<void>
{
    await (promisify(fs.rename))(from, to);
}

export async function copyFile(from:string, to:string) : Promise<void>
{
    await (promisify(fs.copyFile))(from, to);
}

export async function saveDbPrints(prints:IPrint[]) : Promise<void>
{
    const tsPath = `./src/lib/printProducts.ts`;
    prints = sortByOldestFirst(prints.slice());
    for (var p of prints)
    {
        delete p.printOptions;
        delete p.id;
    }
    await fs.writeFileSync(tsPath, `export const data = ${JSON.stringify(prints, null, 2)}`);
}

export async function generateThumbnail(product:Partial<IPrint>, size:number=600, quality:number=65) : Promise<void>
{
    const fname = path.basename(product.image + "");
    const fullPath = `./public${product.image}`;
    const thumbPath = `./public/images/products/thumb/${fname}`;

    console.log("Generating thumb for: ", product.title);

    var img = await Jimp.read(fullPath);
    img.resize(size, Jimp.AUTO);
    img.quality(quality);
    await writeImage(img, thumbPath);
}

export async function resizeImg(srcPath:string, destPath:string, width:number, quality:number=65) : Promise<void>
{
    console.log(`Resizing image '${srcPath}' to '${destPath}' with width ${width} and quality ${quality}`);
    var img = await Jimp.read(srcPath);
    img.resize(width, Jimp.AUTO);
    img.quality(quality);
    await writeImage(img, destPath);
}

export async function limitImageSize(path:string, maxSize:number, quality:number=65) : Promise<void>
{
    var img = await Jimp.read(path);
    if (img.bitmap.width <= maxSize)
    {
        console.log(`Image '${path}' is already <= ${maxSize}, skipping`);
        return;
    }

    console.log(`Processing image '${path}' resizing to ${maxSize} with quality ${quality}`);

    img.resize(maxSize, Jimp.AUTO);
    img.quality(quality);
    await writeImage(img, path);
}

export async function writeImage(img:Jimp, path:string) : Promise<any>
{
    return new Promise((resolve,reject) => {
        img.write(path, err => {
            if (err)
                reject(err);
            else
                resolve();
        });
    })
}

export class Collection
{
    readonly subDirs: string[];
    readonly name:string;
    readonly hasHighresExport:boolean;
    readonly hasHighresDir:string;
    readonly images:string[];
    readonly websiteImages:string[];
    readonly invalidFileStarts = ["IMG", "DJI", "YDX", "0", "DSC", "The Office"]

    constructor(public dir:string) {
        this.subDirs = getDirectories(dir);
        var parts = dir.split("\\");
        this.name = parts[parts.length-1];
        this.hasHighresDir = this.subDirs.find(d => d.toLowerCase().endsWith("highres export"));
        this.hasHighresExport = this.hasHighresDir != null;
        if (this.hasHighresExport)
        {
            this.images = fs.readdirSync(this.hasHighresDir);
            this.websiteImages = this.images.filter(i => this.invalidFileStarts.find(s => i.startsWith(s)) == null)
        }
    }

    getExportDir(parentDir:string) {
        return `${parentDir}\\${this.name}`;
    }

    getExportImagePath(parentDir:string, img:string) {
        return `${this.getExportDir(parentDir)}\\${img}`;
    }

    getSrcImagePath(img:string) {
        return `${this.hasHighresDir}\\${img}`;
    }

    getImagesRequiringExport(dir:string): string[] {

        console.log(`Getting images that require export for '${this.name}'`);

        if (!fs.existsSync(dir))
            return this.websiteImages;
        
        const exportDir = this.getExportDir(dir);
        if (!fs.existsSync(exportDir))
            return this.websiteImages;
        
        return this.websiteImages.filter(i => this.doesImageRequireExport(i, dir));
    }

    doesImageRequireExport(img:string, exportDir:string) : boolean
    {
        var exportFile = this.getExportImagePath(exportDir,img);
        if (!fs.existsSync(exportFile))
            return true;
        
        var src = fs.readFileSync(this.getSrcImagePath(img));
        var exp = fs.readFileSync(exportFile);
        return !src.equals(exp);
    }

    exportImage(img:string, exportDir:string) : Promise<void>
    {
        if (!fs.existsSync(this.getExportDir(exportDir)))
            fs.mkdirSync(this.getExportDir(exportDir));
        
        return promisify(fs.copyFile)(this.getSrcImagePath(img),this.getExportImagePath(exportDir, img));
    }
}