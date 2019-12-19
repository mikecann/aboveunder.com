import * as React from "react";
import { Dropdown, Container, Header, Segment, Grid } from "semantic-ui-react";
import { IPost } from "../lib/types";
import moment from "moment";
import { BlogPostsThumbGrid } from "./BlogPostsThumbGrid";
import { useDb } from "../hooks/useDb";
import { LoadingPage } from "../loading/LoadingPage";
import { CommonPageLayout } from "../components/CommonPageLayout";
import { startPreloading } from "../routes";
import { Helmet } from "react-helmet";

const orderOptions = [
  {
    text: "Latest",
    value: "latest",
  },
  {
    text: "Oldest",
    value: "oldest",
  },
];

const defaultOrderValue = orderOptions[0].value;

const numToShow = 20;

interface IProps {
  posts: IPost[];
}

interface State {
  selectedOrderValue: string;
  visiblePosts: IPost[];
}

export default function BlogPage({}: IProps) {
  const [db] = useDb();

  const orderPosts = (orderOptionValue: string): IPost[] => {
    if (!db) return [];

    var products = [...db.posts];

    if (orderOptionValue == "latest")
      products = products.sort((a, b) => moment(b.dateCreated).diff(moment(a.dateCreated).utc()));

    if (orderOptionValue == "oldest")
      products = products.sort((a, b) => moment(a.dateCreated).diff(moment(b.dateCreated).utc()));

    return products.slice(0, numToShow);
  };

  const [state, setState] = React.useState<State>({
    selectedOrderValue: defaultOrderValue,
    visiblePosts: orderPosts(defaultOrderValue),
  });

  React.useEffect(
    () => setState(prev => ({ ...prev, visiblePosts: orderPosts(defaultOrderValue) })),
    [db]
  );

  if (!db) return <LoadingPage />;

  const handleSelectedOrderValueChanged = (e: any, dropdown: any) =>
    setState({
      selectedOrderValue: dropdown.value,
      visiblePosts: orderPosts(dropdown.value),
    });

  return (
    <CommonPageLayout activeMenu="blog">
      <Helmet>
        <title>Above Under - Blog</title>
      </Helmet>
      <Segment style={{ padding: "4em 0em" }} vertical>
        <Container>
          <Header as="h1">Blog Posts</Header>

          <Grid columns={2}>
            <Grid.Column>
              <Dropdown
                fluid
                selection
                options={orderOptions}
                value={state.selectedOrderValue}
                onChange={handleSelectedOrderValueChanged}
              />
            </Grid.Column>
            <Grid.Column>
              {/* <Menu pagination>
                <Menu.Item name='1' active={activeItem === '1'} onClick={this.handleItemClick} />
                <Menu.Item disabled>...</Menu.Item>
                <Menu.Item name='10' active={activeItem === '10'} onClick={this.handleItemClick} />
                <Menu.Item name='11' active={activeItem === '11'} onClick={this.handleItemClick} />
                <Menu.Item name='12' active={activeItem === '12'} onClick={this.handleItemClick} />
              </Menu> */}
            </Grid.Column>
          </Grid>

          <BlogPostsThumbGrid posts={state.visiblePosts} />
        </Container>
      </Segment>
    </CommonPageLayout>
  );
}

startPreloading();
