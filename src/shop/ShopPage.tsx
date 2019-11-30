import * as React from "react";

import { IPrint, IDB } from "../lib/types";
import { Visibility, VisibilityEventData } from "semantic-ui-react";
import { sortByLatestFirst, sortByOldestFirst } from "../lib/utils";
import { CommonPageLayout } from "../components/CommonPageLayout";
import { ShopPageMenu } from "../components/ShopPageMenu";
import { startPreloading } from "../routes";
import { useDb } from "../hooks/useDb";
import { LoadingPage } from "../loading/LoadingPage";
import { useHistory } from "react-router";
import { ProductThumbGrid2 } from "../components/ProductThumbGrid2";
import { useResponsive } from "../hooks/useResponsive";
import { Vertical } from "gls/lib";
import { Pagination } from "./Pagination";
import { useQuery } from "../hooks/useQuery";

type Category = "latest" | "oldest" | "featured";

const categroyOptions: { text: string; value: Category }[] = [
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

const defaultCategoryValue = categroyOptions[2].value;

const pageSize = 18;

interface Query {
  page?: string;
  category?: Category;
  search?: string;
}

interface State {
  category: string;
  selectedPrints: IPrint[];
  visiblePrints: IPrint[];
  pageIndex: number;
  totalPages: number;
  bottomMenuVisible?: boolean;
  searchTerm: string;
}

const searchPrints = (term: string, prints: IPrint[]): IPrint[] => {
  if (term === "") return prints;

  term = term.toLowerCase();
  return prints.filter(
    p => p.title.toLocaleLowerCase().includes(term) || p.description.toLowerCase().includes(term)
  );
};

const orderAndSearchPrints = (db: IDB, orderOptionValue: string, term: string): IPrint[] => {
  var sortedPrints = orderPrints(db, orderOptionValue);
  var searchedPrints = searchPrints(term, sortedPrints);
  return searchedPrints;
};

const orderPrints = (db: IDB, orderOptionValue: string): IPrint[] => {
  var prints = [...db.prints];
  if (orderOptionValue == "latest") prints = sortByLatestFirst(prints);
  if (orderOptionValue == "oldest") prints = sortByOldestFirst(prints);
  if (orderOptionValue == "featured") prints = prints.filter(p => p.featured);
  return prints;
};

export default function ShopPage() {
  const [db] = useDb();
  const responsive = useResponsive();
  const history = useHistory();
  const query = useQuery<Query>();

  const [state, setState] = React.useState<State>(() => ({
    category: query.category ? query.category : defaultCategoryValue,
    selectedPrints: [],
    visiblePrints: [],
    pageIndex: query.page ? Number.parseInt(query.page) : 0,
    totalPages: 1,
    searchTerm: query.search ? query.search : "",
  }));

  // React.useEffect(() => {
  //   if (!db) return;
  //   const sorted = orderAndSearchPrints(db, state.category, state.searchTerm);
  //   setState({
  //     ...state,
  //     selectedPrints: sorted,
  //     visiblePrints: sorted.slice(0, pageSize),
  //     totalPages: Math.ceil(sorted.length / pageSize),
  //   });
  // }, [db]);

  // Update the history so the user can use the back button to undo
  React.useEffect(() => {
    history.push(
      `/shop?page=${state.pageIndex}&category=${state.category}&search=${state.searchTerm}`
    );
  }, [state.pageIndex, state.category, state.searchTerm]);

  // If one of the options changes update the prints on show
  React.useEffect(() => {
    if (!db) return;
    const selectedPrints = orderAndSearchPrints(db, state.category, state.searchTerm);
    const offset = state.pageIndex * pageSize;
    const visiblePrints = selectedPrints.slice(offset, offset + pageSize);
    setState(prev => ({
      ...prev,
      selectedPrints,
      visiblePrints,
      totalPages: Math.ceil(selectedPrints.length / pageSize),
    }));
  }, [db, state.pageIndex, state.searchTerm, state.category]);

  if (!db) return <LoadingPage />;

  const { category, visiblePrints, searchTerm, bottomMenuVisible } = state;

  const onVisibilityUpdate = (e: null, data: VisibilityEventData) => {
    const bottomMenuVisible = !data.calculations.topVisible;
    if (state.bottomMenuVisible == bottomMenuVisible) return;
    setState(prev => ({ ...prev, bottomMenuVisible }));
  };

  return (
    <CommonPageLayout activeMenu="shop">
      <Vertical
        horizontalAlign="center"
        style={{
          marginTop: "2em",
          paddingTop: "4em",
          paddingBottom: "4em",
          paddingLeft: responsive.margin,
          paddingRight: responsive.margin,
        }}
      >
        <ShopPageMenu
          searchTerm={searchTerm}
          selectedOrderValue={category}
          fixToBottom={bottomMenuVisible}
          orderOptions={categroyOptions}
          onSelectedCategoryChanged={cat =>
            setState(prev => ({ ...prev, category: cat, pageIndex: 0, searchTerm: "" }))
          }
          onSearchTermChanged={term =>
            setState(prev => ({
              ...prev,
              searchTerm: term,
              pageIndex: 0,
              category: "latest",
            }))
          }
        />
        <Visibility onUpdate={onVisibilityUpdate}>
          <ProductThumbGrid2 products={visiblePrints} />
        </Visibility>
        <div>
          <Pagination
            currentPage={state.pageIndex}
            onPageClick={page => setState(prev => ({ ...prev, pageIndex: page }))}
            totalPages={state.totalPages}
          />
        </div>
      </Vertical>
    </CommonPageLayout>
  );
}

startPreloading();
