import * as React from "react";

import { Dropdown, Container, Header, Segment, Grid } from 'semantic-ui-react';
import { IPost } from "../lib/types";
import * as moment from "moment";
import { BlogPostsThumbGrid } from "./BlogPostsThumbGrid";
import { CommonPageLayout } from "./CommonPageLayout";

const orderOptions = [
  {
    text: "Latest",
    value: "latest"
  },
  {
    text: "Oldest",
    value: "oldest"
  }
];

const defaultOrderValue = orderOptions[0].value;

const numToShow = 20;

interface IProps {
  posts: IPost[]
}

interface IState {
  selectedOrderValue: string;
  visiblePosts: IPost[];
}

export class BlogPage extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
      selectedOrderValue: defaultOrderValue,
      visiblePosts: this.orderPosts(defaultOrderValue)
    }
  }

  render() {

    const selectedOrderValue = this.state.selectedOrderValue;
    const visiblePosts = this.state.visiblePosts;

    return <CommonPageLayout activeMenu="blog">

      <Segment style={{ padding: '4em 0em' }} vertical>
        <Container>
         
          <Header as="h1">Blog Posts</Header>

          <Grid columns={2}>
            <Grid.Column>
              <Dropdown fluid selection options={orderOptions}
                value={selectedOrderValue}
                onChange={this.handleSelectedOrderValueChanged} />

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

          <BlogPostsThumbGrid posts={visiblePosts} />

        </Container>
      </Segment>

    </CommonPageLayout>
  }

  handleSelectedOrderValueChanged = (e: any, dropdown: any) =>
    this.setState({
      selectedOrderValue: dropdown.value,
      visiblePosts: this.orderPosts(dropdown.value)
    });

  orderPosts(orderOptionValue: string): IPost[] {
    var products = [...this.props.posts];

    if (orderOptionValue == "latest")
      products = products.sort((a, b) => moment(b.dateCreated).diff(moment(a.dateCreated).utc()))

    if (orderOptionValue == "oldest")
      products = products.sort((a, b) => moment(a.dateCreated).diff(moment(b.dateCreated).utc()))

    return products.slice(0, numToShow);
  }

}
