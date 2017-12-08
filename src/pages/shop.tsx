import * as React from "react";

import Head from 'next/head'
import { getDb } from "../lib/db";
import { IProduct } from "../lib/types";
import { ShopPage } from "../components/ShopPage";
import { HeaderMenu } from "../components/HeaderMenu";
import { PageFooter } from "../components/PageFooter";

interface IProps
{
  allProducts: IProduct[],
}

export default class extends React.Component<IProps, any> {

  static async getInitialProps () {
    const db = await getDb();
    return { 
      allProducts: db.products,
    }
  }

  render () {
    const { allProducts} = this.props;
    return (
      <main>
        
        <Head>
          <title>Above Under - Shop</title>
          <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
        </Head>

        <HeaderMenu menuProps={{ size:"huge" }} activeMenu="shop" />
        <ShopPage products={allProducts} />
        <PageFooter />

      </main>
    )
  }
}
