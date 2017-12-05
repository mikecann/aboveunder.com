import * as React from "react";

import {  IPost } from "../lib/types";
import { AUHeader } from "./AUHeader";
import { Dropdown } from "semantic-ui-react";
import * as moment from "moment";
import { BlogPostSummary } from "./BlogPostSummary";

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

    return <div>
      <AUHeader />

      <h1>Blog</h1>

      <div>
        <Dropdown fluid selection options={orderOptions}
          value={selectedOrderValue}
          onChange={this.handleSelectedOrderValueChanged} />
      </div>

      <section>
        {visiblePosts.map(post => <BlogPostSummary {...post} key={post.id} />)}
      </section>

    </div>
  }

  handleSelectedOrderValueChanged = (e: any, dropdown: any) =>
    this.setState({
      selectedOrderValue: dropdown.value,
      visiblePosts: this.orderPosts(dropdown.value)
    });

  orderPosts(orderOptionValue:string) : IPost[]
  {
    var products = [...this.props.posts];

    if (orderOptionValue == "latest")
      products = products.sort((a,b) => moment(b.dateCreated).diff(moment(a.dateCreated).utc()))

    if (orderOptionValue == "oldest")
      products = products.sort((a,b) => moment(a.dateCreated).diff(moment(b.dateCreated).utc()))

    return products.slice(0, numToShow);
  }

}
