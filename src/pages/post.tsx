import * as React from "react";

import Link from 'next/link'
import Head from 'next/head'
import {getDb} from "../lib/db"
import { IPost } from "../lib/types";
import { AUHeader } from "../components/AUHeader";

interface IProps extends IPost
{

}

export default class extends React.Component<IProps, any> {

  static async getInitialProps () {
    // fetch single post detail
    const post = (await getDb()).posts[0];
    return { ...post }
  }

  render () {
    return (
      <main>
        <Head>
          <title>{this.props.title}</title>
        </Head>

        <AUHeader />

        <h1>{this.props.title}</h1>

        <p>{this.props.body}</p>

        <Link href='/'>
          <a>Go back to home</a>
        </Link>
      </main>
    )
  }
}