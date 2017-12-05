import * as React from "react";

import Head from 'next/head'
import * as fetch from 'isomorphic-unfetch'
import Post from '../components/post'
import { ProductThumbsList } from "../components/ProductThumbsList";
import { getDb } from "../lib/db";
import { IPost, IProduct } from "../lib/types";
import { AUHeader } from "../components/AUHeader";

interface IProps
{
  allProducts: IProduct[],
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
    const { allProducts} = this.props;
    return (
      <main>
        
        <Head>
          <title>Above Under - Shop</title>
        </Head>

        <AUHeader />

        <h1>All Images</h1>

        <section>
          <ProductThumbsList products={allProducts} />
        </section>

      </main>
    )
  }
}
