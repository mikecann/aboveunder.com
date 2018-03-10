import * as React from "react";

import { IPrint } from "../lib/types";
import { ProductThumbGrid } from "./ProductThumbGrid";
import { Container, Segment, Visibility, VisibilityEventData, InputOnChangeData } from 'semantic-ui-react';
import { sortByLatestFirst, sortByOldestFirst } from "../lib/utils";
import { CommonPageLayout } from "./CommonPageLayout";
import { ShopPageMenu } from "./ShopPageMenu";

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

const pageSize = 18;

interface IProps {
  prints: IPrint[],
  initialPageIndex?: number,
  history: any
}

interface IState {
  selectedOrderValue: string;
  selectedPrints: IPrint[];
  visiblePrints: IPrint[];
  pageIndex: number;
  bottomMenuVisible?: boolean;
  searchTerm: string;
}

export class ShopPage extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);

    const sorted = this.orderPrints(defaultOrderValue);
    this.state = {
      selectedOrderValue: defaultOrderValue,
      selectedPrints: sorted,
      visiblePrints: sorted.slice(0, pageSize),
      pageIndex: props.initialPageIndex || 0,
      searchTerm: ""
    }
  }

  render() {

    const { selectedOrderValue, visiblePrints, searchTerm, bottomMenuVisible } = this.state;

    return <CommonPageLayout activeMenu="shop">

      <Segment style={{ padding: '4em 0em' }} vertical>
        <Container>
        
          <ShopPageMenu 
            searchTerm={searchTerm} 
            selectedOrderValue={selectedOrderValue} 
            fixToBottom={bottomMenuVisible}
            orderOptions={orderOptions}
            onSelectedOrderValueChanged={this.handleSelectedOrderValueChanged}
            onSearchTermChanged={this.handleSearchChange}
            />          

          <Visibility onUpdate={this.handleInfiniteScrollVisibility}>
            <ProductThumbGrid products={visiblePrints} />
          </Visibility>

        </Container>
        
      </Segment>

    </CommonPageLayout>
  }

  handleSearchChange = (e: any, data: InputOnChangeData) => {   
    var prints = this.orderAndSearchPrints(this.state.selectedOrderValue, data.value);
    this.setState({ 
      searchTerm: data.value, 
      selectedPrints:prints,
      pageIndex: 0,
      visiblePrints: prints.slice(0, pageSize),
    });
  }

  handleInfiniteScrollVisibility = (e: null, data: VisibilityEventData) => {
    if (data.calculations.bottomVisible) {
      const { visiblePrints, selectedPrints } = this.state;
      if (visiblePrints.length != selectedPrints.length)
        this.setState({ visiblePrints: selectedPrints.slice(0, visiblePrints.length + pageSize) });
    }
    this.setState({ bottomMenuVisible: !data.calculations.topVisible });
  }

  handleSelectedOrderValueChanged = (value:string) => {

    var prints = this.orderAndSearchPrints(value, this.state.searchTerm);
    this.setState({
      selectedOrderValue: value,
      pageIndex: 0,
      visiblePrints: prints.slice(0, pageSize),
      selectedPrints: prints
    });
  }

  orderAndSearchPrints(orderOptionValue: string, term: string): IPrint[] {
    var sortedPrints = this.orderPrints(orderOptionValue);
    var searchedPrints = this.searchPrints(term, sortedPrints);
    return searchedPrints;
  }

  orderPrints(orderOptionValue: string): IPrint[] {
    var prints = [...this.props.prints];

    if (orderOptionValue == "latest")
      prints = sortByLatestFirst(prints);

    if (orderOptionValue == "oldest")
      prints = sortByOldestFirst(prints)

    if (orderOptionValue == "featured")
      prints = prints.filter(p => p.featured)

    return prints;
  }

  searchPrints(term: string, prints: IPrint[]): IPrint[] {

    if (term==="")
      return prints;

    term = term.toLowerCase();
    return prints.filter(p => p.title.toLocaleLowerCase().includes(term) || p.description.toLowerCase().includes(term));
  }

}
