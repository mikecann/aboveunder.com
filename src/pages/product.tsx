import * as React from "react";

import Link from 'next/link'
import Head from 'next/head'
import {IPost, getDb, getProduct, IProduct} from "../lib/db"

interface IServerProps
{
  query: {
    id: string
  }
}

interface IProps
{
  product: IProduct
}

export default class extends React.Component<IProps, any> {

  static async getInitialProps(props:IServerProps) {
    // fetch single post detail
    const product = await getProduct(props.query.id)
    return { product }
  }

  render () {
    const {product} = this.props;
    return (
      <main>
        <Head>
          <title>Above Under - {product.title}</title>
        </Head>

        <h1>{product.title}</h1>

        <p>{product.description}</p>

        <Link href='/'>
          <a>Go back to home</a>
        </Link>
        
      </main>
    )
  }
}