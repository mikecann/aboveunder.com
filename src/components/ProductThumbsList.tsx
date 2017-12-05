import * as React from "react";

import Link from 'next/link'
import Head from 'next/head'
import { IPost, IProduct } from "../lib/db"

interface IProps {
  products: IProduct[]
}

export class ProductThumbsList extends React.Component<IProps, any> {

  render() {
    const { products } = this.props;
    return products.map(p => <ProductThumb key={p.id} {...p} />);
  }
}

const ProductThumb = (product: IProduct) =>
  <article>
    <h1>{product.title}</h1>
    {/* render the URL as /post/:id */}
    <Link href={{ pathname: '/product', query: { id: product.id } }} as={`/product/${product.id}`}>
      <a>Read more...</a>
    </Link>
  </article>