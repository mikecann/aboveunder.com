import * as path from "path";
import { IPrint, IDB } from '../src/lib/types';
import { getDb } from "../src/lib/db";
import { getFilesInDir, fullImageDir, askQuestion, askConfirmation, renameFile, getFullImgPath, saveDbPrints, generateThumbnail, limitImageSize, Collection, resizeImg, copyFile } from './utils';
import * as moment from 'moment';
import { getDirectories } from "../src/lib/utils";

async function run()
{
    var db = await getDb();
    var mediaDir = await askQuestion("Media projects dir?", `D:\\Media Projects\\Above Under\\`);
    var collections = getDirectories(mediaDir).map(d => new Collection(d));
    var validCollections = collections.filter(c => c.hasHighresExport);
    console.log(`Media projects contains ${collections.length} collections, ${validCollections.length} of them are valid`);
    var dropboxDir = await askQuestion("Dropbox dir?", `C:\\Dropbox`);
    var highresDropboxDir = `${dropboxDir}\\Projects\\Above Under\\Highres`;

    var missingFnames = getFilesFromCollectionsThatWeDontHavePrintsFor(validCollections, highresDropboxDir, db);
    if (missingFnames.length > 0)
    {
        console.log(`Detected ${missingFnames.length} images that we dont have prints for.`, missingFnames);
        if (await askConfirmation("Do you want to continue?") == false)
            return;
    }

    var exportedImgs: string[] = [];
    await Promise.all(validCollections.map(c => tryExportCollection(c, highresDropboxDir, exportedImgs)));
        
    if (exportedImgs.length == 0)
        return;

    console.log(``);
    console.log(`Generating public share variants for ${exportedImgs.length} images`);

    var newPublicShareImgs : string[] = [];
    for (var img of exportedImgs)
        newPublicShareImgs.push(await generatePublicShareVariant(img, dropboxDir));

    var newFilesWithNoPrints : string[] = [];

    console.log(``);
    console.log(`Copying public share variants to local dir and generating thumbs..`);

    for (var img of newPublicShareImgs)
    {
        var fname = path.basename(img).split(" ").join("-");
        var print = db.prints.find(p => p.title == path.parse(img).name);
        var destDir = `${__dirname}/../../public/images/products`;
        await copyFile(img, `${destDir}/full/${fname}`);
        await resizeImg(img, `${destDir}/thumb/${fname}`, 600, 65);
        if (!print)
            newFilesWithNoPrints.push(fname);
    }

    if (newFilesWithNoPrints.length==0)
        return;

    console.log(``);
    console.log(`Found ${newFilesWithNoPrints.length} files that have no corresponding prints:`, newFilesWithNoPrints);

    await saveNewFilesToDb(newFilesWithNoPrints);
}

function getFilesFromCollectionsThatWeDontHavePrintsFor(collections:Collection[], highresDropboxDir:string, db:IDB) : string[]
{
    var x = collections.map(c => c.getImagesRequiringExport(highresDropboxDir).map(i => c.getSrcImagePath(i)));
    var y : string[] = [].concat.apply([], x);
    var z = y.filter(i => db.prints.find(p => p.title == path.parse(i).name) == null);
    return z;
}

function getImagesWithPrints(imgPaths:string[], db:IDB) : string[]
{
    return imgPaths.filter(i => {
        var fname = path.parse(i).name;
        return db.prints.find(p => p.title == fname);
    });
}

async function generatePublicShareVariant(imgPath:string, dropboxDir:string) : Promise<string>
{
    var parts = imgPath.split("\\");
    var publicShareDir = `${dropboxDir}\\Projects\\Above Under\\Public Share`;
    var destFile = `${publicShareDir}\\${parts[parts.length-2]}\\${parts[parts.length-1]}`;
    await resizeImg(imgPath, destFile, 1600, 65);
    return destFile;
}

async function tryExportCollection(c:Collection, highresDropboxDir:string, exportedImgs:string[]) : Promise<void>
{
    var imagesRequiringExport = c.getImagesRequiringExport(highresDropboxDir);
    console.log(`Found ${imagesRequiringExport.length} images requiring export from collection '${c.name}'.`);
    for(var i of imagesRequiringExport)
    {
        console.log(`Exporting image '${i}' from collection '${c.name}'`);
        await c.exportImage(i, highresDropboxDir);
        exportedImgs.push(c.getExportImagePath(highresDropboxDir, i));
    }
}

async function saveNewFilesToDb(files:string[]) : Promise<IPrint[]>
{
    console.log(``);
    var db = await getDb();
    var prints : IPrint[] = [];

    for(var file of files)
    {
        while (true)
        {
            var print = await getNewPrint(file);
            console.log(``);
            console.log(JSON.stringify(print,null,2));
            console.log(``);
            if (await askConfirmation("Does this look okay?"))
            {
                prints.push(print);
                break;
            }
            console.log(``);
        }
        
        console.log(``);
    }
    
    console.log(`Saving prints to file..`);
    await saveDbPrints([...db.prints.slice(), ...prints]);
    console.log(`Saved.`);
    console.log(``);

    return prints;
}

async function getNewPrint(file:string) : Promise<IPrint>
{
    console.log(`For image: ${file}`);
    var print : IPrint = {
        id: undefined,
        printOptions: undefined,
        image: `/images/products/full/${file}`,
        thumb: `/images/products/thumb/${file}`,
        title: await askQuestion("Title?", file.split("-").join(" ").replace(".jpg","")),
        dateCreated: await askQuestion("Date Created?", moment().format()),
        description: await askQuestion("Description?", ""),
        featured: await askConfirmation("Featured?")
    };
    return print;
}

async function findNewImages(allImages:string[]) : Promise<string[]>
{
    console.log(`Looking for new images..`);
    var db = await getDb();
    return allImages.filter(i => db.prints.find(p => p.image.indexOf(i) != -1) == null);
}

async function tryNormalize(files:string[])
{
    var filesWithSpaces = files.filter(f => f.indexOf(" ") != -1);
    if (filesWithSpaces.length!=0)
    {
        console.log(``);
        console.log(`Found ${filesWithSpaces.length} images that have spaces in the filename.`);
        if (await askConfirmation("would you like to normalize these?"))
            await normalize(filesWithSpaces);
    }
}

async function normalize(files:string[])
{
    console.log(``);
    console.log(`Normalizing ${files.length} images..`);
    for (var fnameWithSpaces of files)
    {
        var fnameWithoutSpaces = fnameWithSpaces.split(" ").join("-");
        console.log(`Changing file name from '${fnameWithSpaces}' to ${fnameWithoutSpaces}`);
        await renameFile(getFullImgPath(fnameWithSpaces), getFullImgPath(fnameWithoutSpaces));
        await limitImageSize(getFullImgPath(fnameWithoutSpaces), 1600);
    }
    console.log(``);
}

async function getValidCollections(mediaDir:string) {
    var directories = getDirectories(mediaDir)
}

run();
