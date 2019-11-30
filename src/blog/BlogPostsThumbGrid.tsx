import * as React from "react";

import { IPost } from "../lib/types";
import moment from "moment";
import { Card, Image, Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";

interface IProps {
  posts: IPost[];
}

export class BlogPostsThumbGrid extends React.Component<IProps, any> {
  render() {
    const { posts } = this.props;
    return (
      <Grid stackable relaxed>
        <Grid.Row columns={3}>
          {posts.map(p => (
            <BlogPostSummary key={p.id} {...p} />
          ))}
        </Grid.Row>
      </Grid>
    );
  }
}

const BlogPostSummary = (post: IPost) => (
  <Grid.Column key={post.id}>
    <Card fluid className="blog-post-thumb" style={{ margin: 10 }}>
      <Image src={post.headerImage} href={`/post/${post.id}`} />
      <Card.Content>
        <Card.Header>{post.title}</Card.Header>
        <Card.Meta>
          <span className="date">{moment(post.dateCreated).calendar()}</span>
        </Card.Meta>
        <Card.Description>{post.summary}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Link to={`/post/${post.id}`}>Read more...</Link>
      </Card.Content>
    </Card>
  </Grid.Column>
);
