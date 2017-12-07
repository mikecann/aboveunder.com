import * as React from "react";

import { IProduct } from "../lib/types";
import { AUHeader } from "./AUHeader";
import { ProductThumbGrid } from "./ProductThumbGrid";
import { Dropdown, Menu, Button, Container, Icon, Header, Segment, Grid } from 'semantic-ui-react';
import { sortLatest, sortOldest } from "../lib/utils";

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

const numToShow = 20;

interface IProps {
  products: IProduct[]
}

interface IState {
  selectedOrderValue: string;
  visibleProducts: IProduct[];
}

export class ShopPage extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
      selectedOrderValue: defaultOrderValue,
      visibleProducts: this.orderProducts(defaultOrderValue)
    }
  }

  render() {

    const selectedOrderValue = this.state.selectedOrderValue;
    const visibleProducts = this.state.visibleProducts;

    return <div>
      <FixedMenu />

      <Container>
        <Header>Shop</Header>
        <Dropdown fluid selection options={orderOptions}
          value={selectedOrderValue}
          onChange={this.handleSelectedOrderValueChanged} />

        <ProductThumbGrid products={visibleProducts} />

      </Container>

    </div>
  }

  handleSelectedOrderValueChanged = (e: any, dropdown: any) =>
    this.setState({
      selectedOrderValue: dropdown.value,
      visibleProducts: this.orderProducts(dropdown.value)
    });

  orderProducts(orderOptionValue: string): IProduct[] {
    var products = [...this.props.products];

    if (orderOptionValue == "latest")
      products = sortLatest(products);

    if (orderOptionValue == "oldest")
      products = sortOldest(products)

    if (orderOptionValue == "featured")
      products = products.sort((a, b) => a.featured ? (b.featured ? 0 : -1) : 1)

    return products.slice(0, numToShow);
  }

}

const FixedMenu = () => (
  <Menu size='large'>
    <Container>
      <Menu.Item as='a' active href="/">Home</Menu.Item>
      <Menu.Item as='a' href="/shop">Shop</Menu.Item>
      <Menu.Item as='a' href="/blog">Blog</Menu.Item>
      <Menu.Item as='a' href="/contact">Contact</Menu.Item>
      <Menu.Item position='right'>
        <Button href="/shop">
          <Icon name="add to cart" />
        </Button>
        <Button href="/shop">
          <Icon name="search" />
        </Button>
      </Menu.Item>
    </Container>
  </Menu>
)