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
        </Head>

        <AUHeader />

        <h1>Featured Images</h1>

        <section>
          <ProductThumbsList products={featuredProducts} />
        </section>

        <h1>All Images</h1>

        <section>
          <ProductThumbsList products={allProducts} />
        </section>

        <h1>Blog Posts</h1>

        <section>
          {latestPosts.map(post => <Post {...post} key={post.id} />)}
        </section>

      </main>
    )
  }
}
