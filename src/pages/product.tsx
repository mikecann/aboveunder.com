import * as React from "react";
import Head from 'next/head'
import { getProduct } from "../lib/db"
import { IProduct } from "../lib/types";
import { ProductPage } from "../components/ProductPage";
import { CommonPageLayout } from "../components/CommonPageLayout";
import { CommonLibs } from "../components/CommonLibs";

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
          <CommonLibs />
        </Head>

        <CommonPageLayout activeMenu="shop">
          <ProductPage product={product} url={url.asPath} />
        </CommonPageLayout>

      </main>
    )
  }
}

