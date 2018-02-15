
import { IPrint } from "../src/lib/types";
import { getDb } from "../src/lib/db";
import { generateThumbnail, saveDbPrints } from "./utils";
import * as path from "path";

async function run()
{
    var db = await getDb();
    for(var p of db.prints)
    {
        const fname = p.title.split(" ").join("-");
        p.image = `/images/products/full/${fname}.jpg`;
        p.thumb = `/images/products/thumb/${fname}.jpg`;
        await generateThumbnail(p);
    }
    await saveDbPrints(db.prints);
}

run();