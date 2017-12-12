import {getDb} from "../src/lib/db";

getDb().then(db => console.log("hello world", db));
