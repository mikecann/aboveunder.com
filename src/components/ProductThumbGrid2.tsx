import * as React from "react";

import { IPrint } from "../lib/types";
import { Grid, Content } from "gls";
import { ProductThumb } from "./ProductThumb";
import { useResponsive } from "../hooks/useResponsive";

interface IProps {
  products: IPrint[];
  featureOneProduct?: boolean;
}

export function ProductThumbGrid2({ products, featureOneProduct }: IProps) {
  return (
    <Grid justify="center" spacing={40}>
      {products.map(p => (
        <Content key={p.id} width={350}>
          <ProductThumb print={p} />
        </Content>
      ))}
    </Grid>
  );
}
