import * as React from "react";

import { IPrint } from "../lib/types";
import { ProductThumbGrid } from "./ProductThumbGrid";
import { Dropdown, Container, Header, Segment, Grid } from 'semantic-ui-react';
import { sortLatest, sortOldest } from "../lib/utils";
import { CommonPageLayout } from "./CommonPageLayout";
import { Paginator } from "./Paginator";

const orderOptions = [
  {
    text: "Latest",
    value: "latest"
  },
  {
    text: "Oldest",
    value: "oldest"
  },
  {
    text: "Featured",
    value: "featured"
  }
];

const defaultOrderValue = orderOptions[0].value;

const numToShow = 999;

interface IProps {
  prints: IPrint[]
}

interface IState {
  selectedOrderValue: string;
  visibleProducts: IPrint[];
  currentPage: number;
}

export class ShopPage extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
      selectedOrderValue: defaultOrderValue,
      visibleProducts: this.orderProducts(defaultOrderValue),
      currentPage: 0
    }
  }

  render() {

    const selectedOrderValue = this.state.selectedOrderValue;
    const visibleProducts = this.state.visibleProducts;

    return <CommonPageLayout activeMenu="shop">

      <Segment style={{ padding: '4em 0em' }} vertical>
        <Container>
          <Header>Shop</Header>

          <Grid columns={2}>
              <Grid.Column>
                <Dropdown fluid selection options={orderOptions}
                  value={selectedOrderValue}
                  onChange={this.handleSelectedOrderValueChanged} />
              
              </Grid.Column>
              <Grid.Column>
                <Paginator allItems={visibleProducts} onPageChanged={this.handlePaginationChange} />               
              </Grid.Column>
            </Grid>

          <ProductThumbGrid products={visibleProducts} />

        </Container>
      </Segment>

    </CommonPageLayout>
  }

  handlePaginationChange = (page:IPrint[]) => {

  }

  handleSelectedOrderValueChanged = (e: any, dropdown: any) =>
    this.setState({
      selectedOrderValue: dropdown.value,
      visibleProducts: this.orderProducts(dropdown.value)
    });

  orderProducts(orderOptionValue: string): IPrint[] {
    var products = [...this.props.prints];

    if (orderOptionValue == "latest")
      products = sortLatest(products);

    if (orderOptionValue == "oldest")
      products = sortOldest(products)

    if (orderOptionValue == "featured")
      products = products.sort((a, b) => a.featured ? (b.featured ? 0 : -1) : 1)

    return products.slice(0, numToShow);
  }

}

