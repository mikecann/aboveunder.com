import * as React from "react";

import Head from 'next/head'
import { getDb } from "../lib/db";
import { IPost } from "../lib/types";
import { BlogPage } from "../components/BlogPage";
import { HeaderMenu } from "../components/HeaderMenu";
import { PageFooter } from "../components/PageFooter";

interface IProps
{
  allPosts:IPost[];
}

export default class extends React.Component<IProps, any> {

  static async getInitialProps () {
    const db = await getDb();
    return { 
      allPosts: db.posts,
    }
  }

  render () {
    const { allPosts} = this.props;

    console.log("props",this.props);

    return (
      <main>
        
        <Head>
          <title>Above Under - Shop</title>
          <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
        </Head>

        <HeaderMenu menuProps={{ size:"huge" }} activeMenu="blog" />
        <BlogPage posts={allPosts} />
        <PageFooter />

      </main>
    )
  }
}
