import * as React from "react";

import Link from 'next/link'
import { IProduct } from "../lib/types";
import { Grid, Image } from "semantic-ui-react";

interface IProps {
  products: IProduct[];
  featureOneProduct?: boolean;
}

export class ProductThumbGrid extends React.Component<IProps, any> {

  render() {
    const { products, featureOneProduct } = this.props;

    if (featureOneProduct && products.length > 3)
      return this.renderWithFeature(products);
    else
      return this.renderWithoutFeature(products);
  }

  renderWithFeature(products: IProduct[]) {
    return <Grid stackable centered relaxed>
      <Grid.Row columns={2} stretched>      
        <Grid.Column width={11} verticalAlign="middle">
          <ProductThumb {...products[0]} />
        </Grid.Column>
        <Grid.Column width={5}>
          <ProductThumb {...products[1]} />
          <ProductThumb {...products[2]} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={3}>
        {products.slice(3).map(p => <ProductThumb key={p.id} {...p} />)}
      </Grid.Row>
    </Grid>;
  }

  renderWithoutFeature(products: IProduct[]) {
    return <Grid stackable centered relaxed>
      <Grid.Row columns={3}>
        {products.map(p => <ProductThumb key={p.id} {...p} />)}
      </Grid.Row>
    </Grid>;
  }
}

const ProductThumb = (product: IProduct) =>
<Grid.Column>
    <Link href={{ pathname: '/product', query: { id: product.id } }} as={`/product/${product.id}`}>
      <a>
        <Image rounded src={product.thumb} style={{ marginTop: "1em", marginBottom: "1em" }} />
      </a>
    </Link>
</Grid.Column>