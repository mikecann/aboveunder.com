import {getDb} from "../src/lib/db";
import * as fs from "fs";

async function run()
{
    var db = await getDb();
    
    var products = [];
    for(var p of db.prints)
        for(var o of p.printOptions)
            for (var s of o.sizes)
                products.push({
                    id: `${p.id}-${o.id}-${s.id}`,
                    price: s.priceAUD,
                    url: "/products.json"
                })

    fs.writeFileSync(`./public/products.json`, JSON.stringify(products,null, 2));    
}

try {
    console.log("Generating projects.json..")
    run();
}
catch (e) {
    console.error(e);
}
