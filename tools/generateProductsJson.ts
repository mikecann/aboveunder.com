import { getDb } from "../src/lib/db";
import * as fs from "fs";

async function run() {
    var db = await getDb();

    if (!fs.existsSync(`./public/products`))
        fs.mkdirSync(`./public/products`);

    var products = [];
    for (var p of db.prints) {
        for (var printer in p.printOptions) {
            for (var o of p.printOptions[printer]) {
                for (var s of o.sizes) {
                    products.push({
                        id: `${p.id}-${o.id}-${s.id}-${printer}`,
                        price: s.priceAUD,
                        url: `/products/${p.id}.json`
                    })
                }
            }
        }
        fs.writeFileSync(`./public/products/${p.id}.json`, JSON.stringify(products, null, 2));
        products = [];
    }


}

try {
    console.log("Generating projects.json..")
    run();
}
catch (e) {
    console.error(e);
}
