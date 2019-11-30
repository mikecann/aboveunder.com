import * as React from "react";

import { IPrint } from "../lib/types";
import { ProductThumbGrid } from "../components/ProductThumbGrid";
import {
  Container,
  Segment,
  Visibility,
  VisibilityEventData,
  InputOnChangeData,
} from "semantic-ui-react";
import { sortByLatestFirst, sortByOldestFirst } from "../lib/utils";
import { CommonPageLayout } from "../components/CommonPageLayout";
import { ShopPageMenu } from "../components/ShopPageMenu";
import { startPreloading } from "../routes";
import { useDb } from "../hooks/useDb";
import { LoadingPage } from "../loading/LoadingPage";
import { useLocation } from "react-router";

const orderOptions = [
  {
    text: "Latest",
    value: "latest",
  },
  {
    text: "Oldest",
    value: "oldest",
  },
  {
    text: "Featured",
    value: "featured",
  },
];

const defaultOrderValue = orderOptions[2].value;

const pageSize = 18;

interface IProps {
  prints: IPrint[];
  initialPageIndex?: number;
  history: any;
}

interface IState {
  selectedOrderValue: string;
  selectedPrints: IPrint[];
  visiblePrints: IPrint[];
  pageIndex: number;
  bottomMenuVisible?: boolean;
  searchTerm: string;
}

interface LocProps {
  page?: string;
}

const searchPrints = (term: string, prints: IPrint[]): IPrint[] => {
  if (term === "") return prints;

  term = term.toLowerCase();
  return prints.filter(
    p => p.title.toLocaleLowerCase().includes(term) || p.description.toLowerCase().includes(term)
  );
};

export default function ShopPage() {
  const [db] = useDb();
  const location = useLocation<LocProps>();

  const [state, setState] = React.useState<IState>({
    selectedOrderValue: defaultOrderValue,
    selectedPrints: [],
    visiblePrints: [],
    pageIndex: location.state && location.state.page ? Number.parseInt(location.state.page) : 0,
    searchTerm: "",
  });

  React.useEffect(() => {
    if (!db) return;
    setState({ ...state, selectedPrints: sorted, visiblePrints: sorted.slice(0, pageSize) });
  }, [db]);

  if (!db) return <LoadingPage />;

  const orderPrints = (orderOptionValue: string): IPrint[] => {
    var prints = [...db.prints];
    if (orderOptionValue == "latest") prints = sortByLatestFirst(prints);
    if (orderOptionValue == "oldest") prints = sortByOldestFirst(prints);
    if (orderOptionValue == "featured") prints = prints.filter(p => p.featured);
    return prints;
  };

  const sorted = orderPrints(defaultOrderValue);

  const { selectedOrderValue, visiblePrints, searchTerm, bottomMenuVisible } = state;

  const handleSearchChange = (e: any, data: InputOnChangeData) => {
    var prints = orderAndSearchPrints(state.selectedOrderValue, data.value);
    setState({
      ...state,
      searchTerm: data.value,
      selectedPrints: prints,
      pageIndex: 0,
      visiblePrints: prints.slice(0, pageSize),
    });
  };

  const handleInfiniteScrollVisibility = (e: null, data: VisibilityEventData) => {
    if (data.calculations.bottomVisible) {
      const { visiblePrints, selectedPrints } = state;
      if (visiblePrints.length != selectedPrints.length)
        setState({
          ...state,
          visiblePrints: selectedPrints.slice(0, visiblePrints.length + pageSize),
        });
    }
    setState({ ...state, bottomMenuVisible: !data.calculations.topVisible });
  };

  const handleSelectedOrderValueChanged = (value: string) => {
    var prints = orderAndSearchPrints(value, state.searchTerm);
    setState({
      ...state,
      selectedOrderValue: value,
      pageIndex: 0,
      visiblePrints: prints.slice(0, pageSize),
      selectedPrints: prints,
    });
  };

  const orderAndSearchPrints = (orderOptionValue: string, term: string): IPrint[] => {
    var sortedPrints = orderPrints(orderOptionValue);
    var searchedPrints = searchPrints(term, sortedPrints);
    return searchedPrints;
  };

  return (
    <CommonPageLayout activeMenu="shop">
      <Segment style={{ padding: "4em 0em" }} vertical>
        <Container>
          <ShopPageMenu
            searchTerm={searchTerm}
            selectedOrderValue={selectedOrderValue}
            fixToBottom={bottomMenuVisible}
            orderOptions={orderOptions}
            onSelectedOrderValueChanged={handleSelectedOrderValueChanged}
            onSearchTermChanged={handleSearchChange}
          />

          <Visibility onUpdate={handleInfiniteScrollVisibility}>
            <ProductThumbGrid products={visiblePrints} />
          </Visibility>
        </Container>
      </Segment>
    </CommonPageLayout>
  );
}

startPreloading();
