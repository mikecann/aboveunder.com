import * as React from "react";
import Head from 'next/head'
import {getDb} from "../lib/db"
import { IPost } from "../lib/types";
import { PostPage } from "../components/PostPage";

interface IServerProps {
  query: {
    id: string
  }
}


interface IProps {
  post: IPost
}


export default class extends React.Component<IProps, any> {

  static async getInitialProps (props: IServerProps) {
    const post = (await getDb()).posts.find(p => p.id == props.query.id);
    //const body = fs.readFileSync(`/static/posts/${post.markdownFileName}`);
    return { post }
  }

  render () {
    const {post} = this.props;
    return (
      <main>

        <Head>
          <title>Above Under - {post.title}</title>
          <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
        </Head>

        <PostPage post={post} />

      </main>
    )
  }
}