"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./lib/db");
module.exports = {
    async exportPathMap() {
        var db = await db_1.getDb();
        var config = {};
        for (let p of db.products)
            config[`/product/${p.id}`] = { page: `/product`, query: { id: p.id } };
        for (let p of db.posts)
            config[`/post/${p.id}`] = { page: `/post`, query: { id: p.id } };
        config[`/`] = { page: `/` };
        config[`/shop`] = { page: `/shop` };
        config[`/blog`] = { page: `/blog` };
        config[`/contact`] = { page: `/contact` };
        return config;
    }
};
