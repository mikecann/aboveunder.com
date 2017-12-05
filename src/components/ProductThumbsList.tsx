import * as React from "react";

import Link from 'next/link'
import Head from 'next/head'
import { IProduct } from "../lib/types";

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
    
    <div>
     
    </div>
    {/* render the URL as /post/:id */}
    <Link href={{ pathname: '/product', query: { id: product.id } }} as={`/product/${product.id}`}>
      <a> 
        <img width={300} src={product.thumb} /> 
        <div>View</div>
      </a>
    </Link>
  </article>