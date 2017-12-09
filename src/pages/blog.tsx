import * as React from "react";

import Head from 'next/head'
import { getDb } from "../lib/db";
import { IPost } from "../lib/types";
import { BlogPage } from "../components/BlogPage";
import { CommonPageLayout } from "../components/CommonPageLayout";
import { CommonLibs } from "../components/CommonLibs";

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
          <CommonLibs />
        </Head>

        <CommonPageLayout activeMenu="blog">
          <BlogPage posts={allPosts} />
        </CommonPageLayout>

      </main>
    )
  }
}
