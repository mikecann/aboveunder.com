import * as React from "react";

import Head from 'next/head'
import * as fetch from 'isomorphic-unfetch'
import Post from '../components/post'
import { ProductThumbsList } from "../components/ProductThumbsList";
import { getDb } from "../lib/db";
import { IPost, IProduct } from "../lib/types";

interface IProps
{
  postList: IPost[],
  products: IProduct[]
}

export default class extends React.Component<IProps, any> {

  static async getInitialProps () {
    // fetch list of posts
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_page=1');
    const postList = await response.json();
    const db = await getDb();
    return { postList, products: db.products }
  }

  render () {
    const {postList, products} = this.props;
    return (
      <main>
        
        <Head>
          <title>Above Under</title>
        </Head>

        <header>
          <div>Above Under</div>
          <ul>
            <li><a href="/shop">Shop</a></li>
          </ul>
        </header>

        <h1>Featured Images</h1>

        <section>
          <ProductThumbsList products={products} />
        </section>

        <h1>All Images</h1>

        <section>
          <ProductThumbsList products={products} />
        </section>

        <h1>Blog Posts</h1>

        <section>
          {postList.map(post => <Post {...post} key={post.id} />)}
        </section>

      </main>
    )
  }
}
