import * as React from "react";

import Head from 'next/head'
import { getDb } from "../lib/db";
import { IPost, IProduct } from "../lib/types";
import { HomePage } from "../components/HomePage";

interface IProps
{
  featuredProducts: IProduct[],
  allProducts: IProduct[],
  latestPosts: IPost[]
}

export default class extends React.Component<IProps, any> {

  static async getInitialProps () {
    const db = await getDb();
    return { 
      featuredProducts: db.products.slice(0,10), 
      allProducts: db.products.slice(0,20),
      latestPosts: db.posts.slice(0, 10)
    }
  }

  render () {
    const {featuredProducts, allProducts, latestPosts} = this.props;
    return (
      <main>
        
        <Head>
          <title>Above Under</title>
          <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
        </Head>

        <HomePage featuredProducts={featuredProducts} allProducts={allProducts}
          latestPosts={latestPosts}  />

      </main>
    )
  }
}
