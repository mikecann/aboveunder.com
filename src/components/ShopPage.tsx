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

const pageSize = 9;

interface IProps {
  prints: IPrint[],
  initialPageIndex?: number,
  history: any
}

interface IState {
  selectedOrderValue: string;
  sortedPrints: IPrint[];
  pageIndex: number;
}

export class ShopPage extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);

    const sorted = this.orderProducts(defaultOrderValue);
    this.state = {
      selectedOrderValue: defaultOrderValue,
      sortedPrints: sorted,
      pageIndex: props.initialPageIndex || 0
    }
  }

  render() {

    const {selectedOrderValue, sortedPrints, pageIndex} = this.state;

    const pagedPrints = this.getPage();

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
                {/* <Paginator allItems={sortedPrints} onPageChanged={this.handlePaginationChange} pageSize={12} />                */}
              </Grid.Column>
            </Grid>

          <ProductThumbGrid products={pagedPrints} />

          <Grid centered columns={1}>
                <Paginator numItems={sortedPrints.length} pageIndex={pageIndex} onPageChanged={this.handlePageChange} pageSize={12} />               
          </Grid>

        </Container>
      </Segment>

    </CommonPageLayout>
  }

  getPage() : IPrint[]
  {
    const {sortedPrints, pageIndex} = this.state;
    const from = pageIndex*pageSize;
    return sortedPrints.slice(from,from+pageSize);
  }

  handlePageChange = (pageIndex:number) => {
    this.setState({pageIndex});
    this.props.history.push(`/shop/${pageIndex}`);
  }

  handleSelectedOrderValueChanged = (e: any, dropdown: any) => {
    this.props.history.push(`/shop/0`);
    this.setState({
      selectedOrderValue: dropdown.value,
      pageIndex: 0,
      sortedPrints: this.orderProducts(dropdown.value)
    });
  }

  orderProducts(orderOptionValue: string): IPrint[] {
    var products = [...this.props.prints];

    if (orderOptionValue == "latest")
      products = sortLatest(products);

    if (orderOptionValue == "oldest")
      products = sortOldest(products)

    if (orderOptionValue == "featured")
      products = products.filter(p => p.featured)

    return products;
  }

}

