import { Collection } from "./Collection";
import { getDirectories } from "../src/lib/utils";
import { CollectionImage } from "./CollectionImage";
import { IDB } from "../src/lib/types";

export class Project
{
    readonly collections : Collection[];
    readonly exportableCollections : Collection[];

    constructor(
        readonly sourcePath:string, 
        readonly highresExportPath:string,
        readonly lowresExportPath:string,
        readonly websiteExportPath: string
    ){
        this.collections = getDirectories(this.sourcePath)
            .map(d => new Collection(this, d,highresExportPath,lowresExportPath));

        this.exportableCollections = this.collections.filter(c => c.hasHighresSourceDir);
    }

    async load(collections:Collection[]) 
    {
        for (var c of collections)
        {
            var indx = collections.indexOf(c);
            console.log(`Loading images in collection '${c.name}' (${indx} of ${collections.length})`)
            await c.loadImages();
        }
    }

    async export(images:CollectionImage[]) 
    {
        for (var img of images)
        {
            var indx = images.indexOf(img);
            console.log(`Exporting image '${img.filename}' from collection '${img.collection.name}' (${indx} of ${images.length})`)
            await img.export();
        }
    }

    async updateDb(images:CollectionImage[], db:IDB) 
    {
        for (var img of images)
        {
            var indx = images.indexOf(img);
            console.log(`Update the database for image '${img.filename}' from collection '${img.collection.name}' (${indx} of ${images.length})`)
            await img.updateOrAddNewPrintToDB(db);
        }
    }
}