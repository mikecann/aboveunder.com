import * as fs from "fs";
import { promisify } from 'util';
import * as readline from "readline";
import { getDb } from "../src/lib/db";
import { IPrint, IDB } from '../src/lib/types';
import { sortByLatestFirst, sortByOldestFirst, getDirectories } from '../src/lib/utils';
import * as path from "path";
import * as Jimp from "jimp";
import { ExifImage } from "exif";
import * as moment from "moment";
import { CollectionImage } from "./CollectionImage";

var exampleExifData = {
    image:
        {
            Make: 'DJI',
            Model: 'FC220',
            XResolution: 240,
            YResolution: 240,
            ResolutionUnit: 2,
            Software: 'Adobe Photoshop Lightroom Classic 7.1 (Windows)',
            ModifyDate: '2018:02:25 17:08:41',
            ExifOffset: 212,
            GPSInfo: 808
        },
    thumbnail:
        {
            Compression: 6,
            XResolution: 72,
            YResolution: 72,
            ResolutionUnit: 2,
            ThumbnailOffset: 1036,
            ThumbnailLength: 24662
        },
    exif:
        {
            ExposureTime: 0.0004347826086956522,
            FNumber: 2.2,
            ExposureProgram: 58655,
            ISO: 100,
            ExifVersion: null,
            DateTimeOriginal: '2017:06:23 11:10:02',
            CreateDate: '2017:06:23 11:10:02',
            ShutterSpeedValue: 11.167418,
            ApertureValue: 2.275007,
            ExposureCompensation: -1.3125,
            MaxApertureValue: 2.27,
            SubjectDistance: 0,
            MeteringMode: 2,
            LightSource: 0,
            Flash: 32,
            FocalLength: 4.7,
            SubSecTimeOriginal: '1',
            SubSecTimeDigitized: '1',
            ColorSpace: 1,
            FileSource: null,
            SceneType: null,
            CustomRendered: 0,
            ExposureMode: 2,
            WhiteBalance: 0,
            DigitalZoomRatio: 0,
            FocalLengthIn35mmFormat: 26,
            SceneCaptureType: 0,
            GainControl: 0,
            Contrast: 0,
            Saturation: 0,
            Sharpness: 0,
            SubjectDistanceRange: 0,
            SerialNumber: '2014031100',
            LensInfo: [26.3, 26.3, 2.2, 2.2],
            LensModel: '26.3 mm f/2.2'
        },
    gps:
        {
            GPSVersionID: [2, 3, 0, 0],
            GPSLatitudeRef: 'S',
            GPSLatitude: [19, 7.4, 0],
            GPSLongitudeRef: 'E',
            GPSLongitude: [146, 52.6667, 0],
            GPSAltitude: 7.9
        },
    interoperability: {},
    makernote: {}
};

export type ExifData = typeof exampleExifData;

export async function getFilesInDir(dir: string): Promise<string[]> {
    return await (promisify(fs.readdir))(dir);
}

export async function askQuestion(question: string, defaultVal?: string): Promise<string> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    var q = defaultVal ? `${question} (${defaultVal})` : question;

    return new Promise<string>((resolve, reject) => {
        rl.question(q + " ", answer => {
            if (!answer && defaultVal)
                answer = defaultVal;

            rl.close();
            resolve(answer);
        })
    })
}

export async function areEqual(filePath1: string, filePath2: string): Promise<boolean> {
    var a = await promisify(fs.readFile)(filePath1);
    var b = await promisify(fs.readFile)(filePath2);
    return a.equals(b);
}

export async function askConfirmation(question: string): Promise<boolean> {
    var answer = await askQuestion(`${question} (Y/n)`);
    if (!answer)
        return true;

    return answer.toLowerCase() == "y";
}

export async function renameFile(from: string, to: string): Promise<void> {
    await (promisify(fs.rename))(from, to);
}

export async function copyFile(from: string, to: string): Promise<void> {
    await (promisify(fs.copyFile))(from, to);
}

export async function saveDbPrints(prints: IPrint[]): Promise<void> {
    const tsPath = `./src/lib/printProducts.ts`;
    prints = sortByOldestFirst(prints.slice());
    for (var p of prints) {
        delete p.printOptions;
        delete p.id;
    }
    await fs.writeFileSync(tsPath, `export const data = ${JSON.stringify(prints, null, 2)}`);
}

export async function generateThumbnail(product: Partial<IPrint>, size: number = 600, quality: number = 65): Promise<void> {
    const fname = path.basename(product.image + "");
    const fullPath = `./public${product.image}`;
    const thumbPath = `./public/images/products/thumb/${fname}`;

    console.log("Generating thumb for: ", product.title);

    var img = await Jimp.read(fullPath);
    img.resize(size, Jimp.AUTO);
    img.quality(quality);
    await writeImage(img, thumbPath);
}

export async function resizeImg(srcPath: string, destPath: string, width: number, quality: number = 65): Promise<void> {
    console.log(`Resizing image '${srcPath}' to '${destPath}' with width ${width} and quality ${quality}`);
    var img = await Jimp.read(srcPath);
    img.resize(width, Jimp.AUTO);
    img.quality(quality);
    await writeImage(img, destPath);
}

export async function limitImageSize(path: string, maxSize: number, quality: number = 65): Promise<void> {
    var img = await Jimp.read(path);
    if (img.bitmap.width <= maxSize) {
        console.log(`Image '${path}' is already <= ${maxSize}, skipping`);
        return;
    }

    console.log(`Processing image '${path}' resizing to ${maxSize} with quality ${quality}`);

    img.resize(maxSize, Jimp.AUTO);
    img.quality(quality);
    await writeImage(img, path);
}

export async function writeImage(img: Jimp, path: string): Promise<any> {
    return new Promise((resolve, reject) => {
        img.write(path, err => {
            if (err)
                reject(err);
            else
                resolve();
        });
    })
}

export async function wait(ms: number): Promise<void> {
    return new Promise<void>(resolve => setTimeout(resolve, ms));
}

export async function getEXIFData(imgPath: string): Promise<ExifData> {
    return new Promise<any>((resolve, reject) => {
        new ExifImage({ image: imgPath }, (err, data) => {
            if (err)
                reject(err);

            resolve(data);
        });
    });
}

export async function getGPSData(imgPath: string): Promise<google.maps.LatLngLiteral> {
    return extractLatLngFromExif(await this.getEXIFData(imgPath));
}

export function extractLatLngFromExif(exif: ExifData): google.maps.LatLngLiteral {
    if (!exif || !exif.gps || !exif.gps.GPSLatitude)
        return undefined;

    return {
        lat: convertDMStoDD(exif.gps.GPSLatitude, exif.gps.GPSLatitudeRef),
        lng: convertDMStoDD(exif.gps.GPSLongitude, exif.gps.GPSLongitudeRef)
    }
}

function convertDMStoDD(dms: number[], ref:string) : number
{
    const hour = dms[0];
    const minute = dms[1];
    const second = dms[2];
    const negate = ref == 'S' || ref == 'W';
    return (hour + (minute/60)+(second/(60*60))) * (negate?-1:1);
}

export function extractDateCreatedFromExif(exif: ExifData): string {
    if (!exif || !exif.exif || !exif.exif.CreateDate)
        return undefined;

    return moment(exif.exif.CreateDate, "YYYY:MM:DD HH:mm:ss").format();
}

export async function createPrint(image:CollectionImage , db:IDB) : Promise<IPrint>
{
    console.log(`For image: ${image.filename}`);
    
    const print : IPrint = {
        id: undefined,
        printOptions: undefined,
        image: `/images/products/full/${image.filename}`,
        thumb: `/images/products/thumb/${image.filename}`,
        title: image.name,
        dateCreated: moment().format(),
        description: await askQuestion("Description?", ""),
        featured: await askConfirmation("Featured?")
    };

    db.prints.push(print);

    return print;
}