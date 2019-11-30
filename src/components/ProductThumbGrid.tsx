import * as React from "react";

import { IPrint } from "../lib/types";
import { Grid } from "semantic-ui-react";
import { ProductThumb } from "./ProductThumb";
import { useResponsive } from "../hooks/useResponsive";

interface IProps {
  products: IPrint[];
  featureOneProduct?: boolean;
}

export function ProductThumbGrid({ products, featureOneProduct }: IProps) {
  const renderWithFeature = (products: IPrint[]) => {
    return (
      <Grid stackable centered relaxed>
        <Grid.Row columns={2} stretched>
          <Grid.Column width={11} verticalAlign="middle">
            <ProductThumb useFull print={products[0]} />
          </Grid.Column>
          <Grid.Column width={5}>
            <ProductThumb print={products[1]} />
            <ProductThumb print={products[2]} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={3}>
          {products.slice(3).map(p => (
            <ProductThumb key={p.id} print={p} />
          ))}
        </Grid.Row>
      </Grid>
    );
  };

  const renderWithoutFeature = (products: IPrint[]) => {
    return (
      <Grid stackable centered relaxed>
        <Grid.Row columns={3}>
          {products.map(p => (
            <ProductThumb key={p.id} print={p} />
          ))}
        </Grid.Row>
      </Grid>
    );
  };

  if (featureOneProduct && products.length > 3) return renderWithFeature(products);
  else return renderWithoutFeature(products);
}
