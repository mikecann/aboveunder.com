import * as React from "react";
import Head from 'next/head'
import { getProduct } from "../lib/db"
import { IProduct } from "../lib/types";
import { ProductPage } from "../components/ProductPage";
import { CommonPageLayout } from "../components/CommonPageLayout";
import { CommonLibs } from "../components/CommonLibs";

interface IServerProps {
  query: {
    id: string,
    option?: string,
    size?: string
  }
}

interface IProps {
  product: IProduct,
  option?:string,
  size?:string,
  url: {
    asPath: string;
  }
}

export default class extends React.Component<IProps, any> {

  static async getInitialProps(props: IServerProps) {
    const query = props.query;
    const product = await getProduct(query.id)
    return { product, option:query.option, size:query.size }
  }

  render() {

    const { product, url, option, size } = this.props;
    return (
      <main>

        <Head>
          <title>Above Under - {product.title}</title>
          <CommonLibs />
        </Head>

        <CommonPageLayout activeMenu="shop">
          <ProductPage product={product} url={url.asPath} 
            initialPrintOption={option} initialPrintSize={size} />
        </CommonPageLayout>

      </main>
    )
  }
}

