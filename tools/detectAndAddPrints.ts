import * as path from "path";
import { IPrint, IDB } from '../src/lib/types';
import { getDb } from "../src/lib/db";
import { getFilesInDir, askQuestion, askConfirmation, renameFile, saveDbPrints, generateThumbnail, limitImageSize, resizeImg, copyFile } from './utils';
import * as moment from 'moment';
import { getDirectories } from "../src/lib/utils";
import { Project } from "./Project";
import { CollectionImage } from "./CollectionImage";

async function run()
{
    const db = await getDb();

    // Grab the settings from the user
    const projectSoucePath = await askQuestion("Above Under source dir path?", `G:\\Media Projects\\Above Under\\`); // D:\\Media Projects\\Above Under\\
    const highresExportPath = await askQuestion("Highres export path?", `D:\\Dropbox\\Projects\\Above Under\\Highres\\`); // C:\\Dropbox
    const lowresExportPath = await askQuestion("Public share export path?", `D:\\Dropbox\\Projects\\Above Under\\Public Share\\`); // C:\\Dropbox
    const websiteExportPath = `${__dirname}/../../public/images/products`;

    // Load the project
    console.log(``);
    console.log(`Loading project..`);
    const project = new Project(projectSoucePath, highresExportPath, lowresExportPath, websiteExportPath);
    const exportableCollections = project.exportableCollections;
    await project.load(exportableCollections);
    const imagesRequiringExport = exportableCollections.reduce((prev,curr)=>[...prev, ...curr.getImagesRequiringExport()],[]);

    // Display the results
    console.log(``);
    console.log(`------------------`);
    console.log({
        collections: project.collections.length,
        exportableCollections: exportableCollections.length,
        exportableImages: exportableCollections.reduce((prev,curr)=>prev+=curr.images.length,0),
        imagesRequiringExport
    });
    console.log(`------------------`);
    console.log(``);

    // Confirm before continuing 
    if (imagesRequiringExport.length == 0 || await askConfirmation("Going to export images now. Continue?") == false)
        return;

    // Export the images
    await project.export(imagesRequiringExport);

    // Update the DB
    await project.updateDb(imagesRequiringExport, db);

    // Save the DB
    await saveDbPrints(db.prints.slice());
}

try
{
    run();
}
catch(e)
{
    console.error(e);
}
