import * as React from "react";

import Head from 'next/head'
import { getDb } from "../lib/db";
import { IPost, IProduct } from "../lib/types";
import { HomePage } from "../components/HomePage";
import { sortLatest, shuffle, sortLatestPosts } from "../lib/utils";
import { PageFooter } from "../components/PageFooter";
import { CommonLibs } from "../components/CommonLibs";

interface IProps
{
  featuredProducts: IProduct[],
  latestProducts: IProduct[],
  latestPosts: IPost[]
}

export default class extends React.Component<IProps, any> {

  static async getInitialProps (context:any) {
    const db = await getDb();
    return { 
      featuredProducts: shuffle(db.products.filter(p => p.featured)).slice(0,9), 
      latestProducts: sortLatest(db.products).slice(0,12),
      latestPosts: sortLatestPosts(db.posts).slice(0, 3)
    }
  }

  render () {
    const {featuredProducts, latestProducts, latestPosts} = this.props;
    return (
      <main>
        
        <Head>
          <title>Above Under</title>
          <CommonLibs />
        </Head>

        <HomePage featuredProducts={featuredProducts} latestProducts={latestProducts}
          latestPosts={latestPosts}  />

        <PageFooter />

      </main>
    )
  }
}
