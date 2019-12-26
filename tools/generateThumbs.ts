import { getDb } from "../src/lib/db";
import { generateThumbnail, saveDbPrints, resizeImg } from "./utils";
import * as path from "path";
import shell from "shelljs";

async function run() {
  var db = await getDb();
  // for(var p of db.prints)
  // {
  //     const fname = p.title.split(" ").join("-");
  //     p.image = `/images/products/full/${fname}.jpg`;
  //     p.thumb = `/images/products/thumb/${fname}.jpg`;
  //     await generateThumbnail(p);
  // }
  // await saveDbPrints(db.prints);

  for (let p of db.posts) {
    const fname = path.basename(p.headerImage);
    const extn = path.extname(fname);
    const fnameWithoutExtn = fname.replace(extn, "");
    const dirname = p.headerImage.replace(fname, "");
    const outname = dirname + fnameWithoutExtn + "-thumb" + extn;

    await resizeImg(`./public/${p.headerImage}`, `./public/${outname}`, 350);

    p.thumbImage = outname;
  }

  await saveDbPosts(db.prints);
}

run();
