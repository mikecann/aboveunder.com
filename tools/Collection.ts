import { getDirectories } from "../src/lib/utils";
import * as fs from "fs";
import { CollectionImage } from "./CollectionImage";
import { promisify } from "util";
import { Project } from "./Project";

// These are image names that have been exported but we want to exclude because they arent AU images
const excludedImageNames = ["IMG", "DJI", "YDX", "0", "DSC", "The Office"];

export class Collection
{
    readonly destPath: string;
    readonly subDirs: string[];
    public images: CollectionImage[];
    readonly name:string;
    readonly hasHighresSourceDir:boolean;
    readonly sourceHighresPath:string;
    readonly exportHighresPath:string;
    readonly exportLowresPath:string;

    constructor(
        readonly project: Project,
        readonly sourcePath: string, 
        readonly exportHighresParentPath: string,
        readonly lowresHighresParentPath: string)
    {
        this.subDirs = getDirectories(sourcePath);
        
        var parts = sourcePath.split("\\");
        this.name = parts[parts.length-1];

        this.sourceHighresPath = this.subDirs.find(d => d.toLowerCase().endsWith("highres export"));
        this.hasHighresSourceDir = this.sourceHighresPath != null;
        this.exportHighresPath = `${exportHighresParentPath}\\${this.name}`
        this.exportLowresPath = `${lowresHighresParentPath}\\${this.name}`
    }

    async loadImages() : Promise<void>
    {
        if (!this.hasHighresSourceDir)
            return;

        this.images = fs.readdirSync(this.sourceHighresPath)
            .filter(i => excludedImageNames.find(s => i.startsWith(s)) == null)
            .map(i => new CollectionImage(this, i));

        await Promise.all(this.images.map(i => i.load()));
    }

    getImagesRequiringExport = () => this.images.filter(i => i.requiresExport);
}