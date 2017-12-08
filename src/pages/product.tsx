import * as React from "react";
import Head from 'next/head'
import { getProduct } from "../lib/db"
import { IProduct } from "../lib/types";
import { ProductPage } from "../components/ProductPage";
import { PageFooter } from "../components/PageFooter";
import { HeaderMenu } from "../components/HeaderMenu";

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
          <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
        </Head>

        <HeaderMenu menuProps={{ size:"huge" }} activeMenu="shop" />
        <ProductPage product={product} url={url.asPath} />
        <PageFooter />

      </main>
    )
  }
}