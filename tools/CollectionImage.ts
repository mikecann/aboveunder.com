import { Collection } from "./Collection";
import * as fs from "fs";
import { areEqual, wait, resizeImg, getEXIFData, extractLatLngFromExif, extractDateCreatedFromExif, askQuestion, askConfirmation, createPrint } from "./utils";
import { promisify } from "util";
import { IDB, IPrint } from "../src/lib/types";

export class CollectionImage
{
    readonly name : string;
    readonly sourcePath : string;
    readonly filenameNoSpaces : string;
    readonly highresExportPath : string;
    readonly lowresExportPath : string;
    readonly websiteFullPath : string;
    readonly websiteThumbPath : string;
    readonly highresExportExists : boolean;
    readonly lowresExportExists : boolean;
    public isModified : boolean;
    public requiresExport : boolean;

    constructor(readonly collection : Collection, readonly filename: string)
    {
        this.name = filename.split(".")[0];
        this.filenameNoSpaces = filename.split(" ").join("-");
        this.sourcePath = `${collection.sourceHighresPath}\\${filename}`;
        this.highresExportPath = `${collection.exportHighresPath}\\${filename}`;
        this.lowresExportPath = `${collection.exportLowresPath}\\${filename}`;
        this.highresExportExists = fs.existsSync(this.highresExportPath);
        this.lowresExportExists = fs.existsSync(this.lowresExportPath);
        this.websiteFullPath = `${collection.project.websiteExportPath}\\full\\${this.filenameNoSpaces}`
        this.websiteThumbPath = `${collection.project.websiteExportPath}\\thumb\\${this.filenameNoSpaces}`
    }

    async load() : Promise<void>
    {
        this.isModified = this.highresExportExists && await areEqual(this.sourcePath, this.highresExportPath ) == false;
        this.requiresExport = !this.highresExportExists || !this.lowresExportExists || this.isModified;
    }   

    async export() {
        await this.exportHighres();
        await this.exportLowres();
        await this.exportWebsiteFull();
        await this.exportWebsiteThumb();
    }

    private async exportHighres() {
        const copy = promisify(fs.copyFile);
        return await copy(this.sourcePath, this.highresExportPath);
    }

    private exportLowres() {
        return resizeImg(this.sourcePath, this.lowresExportPath, 1600, 65);
    }

    private exportWebsiteFull() {
        const copy = promisify(fs.copyFile);
        return copy(this.lowresExportPath, this.websiteFullPath);
    }

    private exportWebsiteThumb() {
        return resizeImg(this.sourcePath, this.websiteThumbPath, 600, 65);
    }

    async updateOrAddNewPrintToDB(db:IDB) {
        const print = db.prints.find(p => p.title == this.name) || await createPrint(this, db);
        return await this.updatePrint(print);        
    }

    private async updatePrint(print:IPrint) {
        var exif = await getEXIFData(this.sourcePath);
        print.gps = extractLatLngFromExif(exif);
        print.dateCreated = extractDateCreatedFromExif(exif);
    }
}