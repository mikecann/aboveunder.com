import * as React from "react";

import { IPrint } from "../lib/types";
import { Grid } from "semantic-ui-react";
import { ProductThumb } from "./ProductThumb";

interface IProps {
  products: IPrint[];
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

  renderWithFeature(products: IPrint[]) {
    return <Grid stackable centered relaxed>
      <Grid.Row columns={2} stretched>      
        <Grid.Column width={11} verticalAlign="middle">
          <ProductThumb useFull product={products[0]} />
        </Grid.Column>
        <Grid.Column width={5}>
          <ProductThumb product={products[1]} />
          <ProductThumb product={products[2]} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={3}>
        {products.slice(3).map(p => <ProductThumb key={p.id} product={p} />)}
      </Grid.Row>
    </Grid>;
  }

  renderWithoutFeature(products: IPrint[]) {
    return <Grid stackable centered relaxed>
      <Grid.Row columns={3}>
        {products.map(p => <ProductThumb key={p.id} product={p} />)}
      </Grid.Row>
    </Grid>;
  }
}

