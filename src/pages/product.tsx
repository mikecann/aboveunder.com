import * as React from "react";

import Link from 'next/link'
import Head from 'next/head'
import { getDb, getProduct } from "../lib/db"
import { IProduct } from "../lib/types";
import { AUHeader } from "../components/AUHeader";

interface IServerProps {
  query: {
    id: string
  }
}

interface IProps {
  product: IProduct,
  url: {
    asPath: string;
  }
}

export default class extends React.Component<IProps, any> {

  static async getInitialProps(props: IServerProps) {
    // fetch single post detail
    const product = await getProduct(props.query.id)
    return { product }
  }

  render() {

    const { product, url } = this.props;
    return (
      <main>
        <Head>
          <title>Above Under - {product.title}</title>
          <script async src='/static/scripts/jquery.min.js' />
          <script async src='/static/scripts/snipcart.js' data-api-key="NDYwN2FhNmUtNzZmNy00Y2I4LTkyODUtMDMyOGNhMDIzZTFjNjM2NDc5ODczMzIxNTUyOTU5" id="snipcart" />
          <link rel='stylesheet' href='https://cdn.snipcart.com/themes/2.0/base/snipcart.min.css' />
        </Head>

        <AUHeader />

        <div>
          <img width={800} src={product.image} />
        </div>

        <h1>{product.title}</h1>

        <p>{product.description}</p>

        <div>

          <button className="snipcart-add-item"
            data-item-id={ product.id }
            data-item-name={ product.title }
            data-item-image={ product.thumb }
            data-item-description={ product.description }
            data-item-url= {url.asPath}
            data-item-price="5.00">
            Buy it for { 5 } $
          </button>

        </div>

        <Link href='/'>
          <a>Go back to home</a>
        </Link>

      </main>
    )
  }
}