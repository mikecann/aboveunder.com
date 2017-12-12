import { getDb } from "./lib/db";

module.exports = {

  async exportPathMap() {

    var db = await getDb();

    var config: any = {};

    // for (let p of db.products) {
    //   config[`/product/${p.id}`] = { page: `/product`, query: { id: p.id } }
    //   for (let o of p.printOptions) {
    //     config[`/product/${p.id}/${o.id}`] = { page: `/product`, query: { id: p.id, option: o.id } }
    //     for (let s of o.sizes) {
    //       config[`/product/${p.id}/${o.id}/${s.id}`] = { page: `/product`, query: { id: p.id, option: o.id, size: o.id } }
    //     }
    //   }
    // }

    for (let p of db.posts)
      config[`/post/${p.id}`] = { page: `/post`, query: { id: p.id } }

    config[`/`] = { page: `/` }
    config[`/shop`] = { page: `/shop` }
    config[`/blog`] = { page: `/blog` }
    config[`/print`] = { page: `/print` }
    config[`/contact`] = { page: `/contact` }
    config[`/about`] = { page: `/about` }

    return config;
  }
}
