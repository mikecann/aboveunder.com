import * as React from "react";

import Head from 'next/head'
import { getDb } from "../lib/db";
import { IPost, IProduct } from "../lib/types";
import { HomePage } from "../components/HomePage";
import { sortLatest, shuffle, sortLatestPosts } from "../lib/utils";

interface IProps
{
  featuredProducts: IProduct[],
  latestProducts: IProduct[],
  latestPosts: IPost[]
}

export default class extends React.Component<IProps, any> {

  static async getInitialProps () {
    const db = await getDb();
    return { 
      featuredProducts: shuffle(db.products.filter(p => p.featured)).slice(0,9), 
      latestProducts: sortLatest(db.products).slice(0,12),
      latestPosts: sortLatestPosts(db.posts).slice(0, 10)
    }
  }

  render () {
    const {featuredProducts, latestProducts, latestPosts} = this.props;
    return (
      <main>
        
        <Head>
          <title>Above Under</title>
          <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
        </Head>

        <HomePage featuredProducts={featuredProducts} latestProducts={latestProducts}
          latestPosts={latestPosts}  />

      </main>
    )
  }
}
