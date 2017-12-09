import * as React from "react";

import Head from 'next/head'
import { getDb } from "../lib/db";
import { IProduct } from "../lib/types";
import { ShopPage } from "../components/ShopPage";
import { CommonPageLayout } from "../components/CommonPageLayout";
import { CommonLibs } from "../components/CommonLibs";

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
          <CommonLibs />
        </Head>

        <CommonPageLayout activeMenu="shop">
          <ShopPage products={allProducts} />
        </CommonPageLayout>

      </main>
    )
  }
}
