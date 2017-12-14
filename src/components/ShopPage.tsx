import * as React from "react";

import { IPrint } from "../lib/types";
import { ProductThumbGrid } from "./ProductThumbGrid";
import { Dropdown, Container, Header, Segment, Grid, Visibility, VisibilityEventData, Menu } from 'semantic-ui-react';
import { sortLatest, sortOldest } from "../lib/utils";
import { CommonPageLayout } from "./CommonPageLayout";

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
  visiblePrints: IPrint[];
  pageIndex: number;
  bottomMenuVisible?: boolean;
}

export class ShopPage extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);

    const sorted = this.orderPrints(defaultOrderValue);
    this.state = {
      selectedOrderValue: defaultOrderValue,
      sortedPrints: sorted,
      visiblePrints: sorted.slice(0, pageSize),
      pageIndex: props.initialPageIndex || 0
    }
  }

  render() {

    const { selectedOrderValue, visiblePrints, bottomMenuVisible } = this.state;

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
            </Grid.Column>
          </Grid>

          <Visibility onUpdate={this.handleInfiniteScrollVisibility}>
            <ProductThumbGrid products={visiblePrints} />
          </Visibility>

          {bottomMenuVisible ?
            <Menu fixed="bottom">
              <Container>
                <Menu.Item>
                  <Dropdown fluid selection options={orderOptions} upward          
                    value={selectedOrderValue}
                    onChange={this.handleSelectedOrderValueChanged} />
                </Menu.Item>
              </Container>
            </Menu>
            : null}
        </Container>
      </Segment>

    </CommonPageLayout>
  }

  handleInfiniteScrollVisibility = (e: null, data: VisibilityEventData) => {
    if (data.calculations.bottomVisible) {
      const { visiblePrints, sortedPrints } = this.state;
      if (visiblePrints.length != sortedPrints.length)
        this.setState({ visiblePrints: sortedPrints.slice(0, visiblePrints.length + pageSize) });
    }
    this.setState({ bottomMenuVisible: !data.calculations.topVisible });
  }

  handleSelectedOrderValueChanged = (e: any, dropdown: any) => {
    var sortedPrints = this.orderPrints(dropdown.value);
    this.setState({
      selectedOrderValue: dropdown.value,
      pageIndex: 0,
      visiblePrints: sortedPrints.slice(0, pageSize),
      sortedPrints
    });
  }

  orderPrints(orderOptionValue: string): IPrint[] {
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

