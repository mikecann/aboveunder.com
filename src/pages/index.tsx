import * as React from "react";

import Head from 'next/head'
import * as fetch from 'isomorphic-unfetch'
import Post from '../components/post'
import { IPost } from "../lib/db";

interface IProps
{
  postList: IPost[]
}

export default class extends React.Component<IProps, any> {

  static async getInitialProps () {
    // fetch list of posts
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_page=1')
    const postList = await response.json()
    return { postList }
  }

  render () {
    return (
      <main>
        
        <Head>
          <title>Home page</title>
        </Head>

        <h1>List of my awesome posts</h1>

        <section>
          {this.props.postList.map(post => <Post {...post} key={post.id} />)}
        </section>

      </main>
    )
  }
}
