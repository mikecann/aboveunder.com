import * as React from "react";
import { IPost, IProduct } from "../lib/types";
import { AUHeader } from "./AUHeader";
import { ProductThumbsList } from "./ProductThumbsList";
import { BlogPostSummary } from "./BlogPostSummary";

interface IProps {
  featuredProducts: IProduct[],
  allProducts: IProduct[],
  latestPosts: IPost[]
}

interface IState {
}

export class HomePage extends React.Component<IProps, IState> {

  render() {

    const {featuredProducts, allProducts, latestPosts} = this.props;
    return <div>

      <AUHeader />

      <h1>Featured Images</h1>

      <section>
        <ProductThumbsList products={featuredProducts} />
      </section>

      <h1>All Images</h1>

      <section>
        <ProductThumbsList products={allProducts} />
      </section>

      <h1>Blog Posts</h1>

      <section>
        {latestPosts.map(post => <BlogPostSummary {...post} key={post.id} />)}
      </section>


    </div>
  }
}
