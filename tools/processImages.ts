
import { IPrint } from "../src/lib/types";
import { getDb } from "../src/lib/db";
import { generateThumbnail, limitImageSize } from "./utils";
import * as path from "path";

async function run()
{
    var db = await getDb();
    for(var p of db.prints)
    {
        const fname = path.basename(p.image + "");
        const fullPath = `./public${p.image}`;
        const thumbPath = `./public/images/products/thumb/${fname}`;
        await Promise.all([
            await limitImageSize(fullPath, 1600), 
            //await limitImageSize(thumbPath, 600)
        ]);
    }
        
}

run();