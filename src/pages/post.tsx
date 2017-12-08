import * as React from "react";
import Head from 'next/head'
import {getDb} from "../lib/db"
import { IPost } from "../lib/types";
import { PostPage } from "../components/PostPage";
import { HeaderMenu } from "../components/HeaderMenu";
import { PageFooter } from "../components/PageFooter";

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

        <HeaderMenu menuProps={{ size:"huge" }} activeMenu="blog" />
        <PostPage post={post} />
        <PageFooter />

      </main>
    )
  }
}