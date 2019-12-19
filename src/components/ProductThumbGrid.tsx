import * as React from "react";
import { IPrint } from "../lib/types";
import { Grid, Content } from "gls";
import { ProductThumb } from "./ProductThumb";

interface IProps {
  products: IPrint[];
  featureOneProduct?: boolean;
}

const thumbWidth = 350;
const thumbSpacing = 40;

export const thumbsPerRow = (width: number) =>
  Math.max(1, Math.floor(width / (thumbWidth + thumbSpacing)));

export function ProductThumbGrid({ products }: IProps) {
  return (
    <Grid justify="center" spacing={[0, thumbSpacing]}>
      {products.map(p => (
        <Content key={p.id} width={thumbWidth}>
          <ProductThumb print={p} />
        </Content>
      ))}
    </Grid>
  );
}
