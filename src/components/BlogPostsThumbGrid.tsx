import * as React from "react";

import Link from 'next/link'
import { IPost } from "../lib/types";
import * as moment from "moment";
import { Card, Image, Grid } from "semantic-ui-react";

interface IProps {
  posts: IPost[];
}

export class BlogPostsThumbGrid extends React.Component<IProps, any> {

  render() {
    const { posts } = this.props;
    return <Grid stackable>
      <Grid.Row columns={3}>      
        {posts.map(p => <BlogPostSummary {...p} />)}
      </Grid.Row>
    </Grid>;
  }
}

const BlogPostSummary = (post: IPost) =>
<Link href={{ pathname: '/post', query: { id: post.id } }} as={`/post/${post.id}`} >
  <Card spaced style={{ margin: 10 }}>
    <Image src={post.headerImage} />
    <Card.Content>
      <Card.Header>
        {post.title}
      </Card.Header>
      <Card.Meta>
        <span className='date'>
          {moment(post.dateCreated).calendar()}
        </span>
      </Card.Meta>
      <Card.Description>
        {post.summary}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      
        <a>Read more...</a>
      
    </Card.Content>
  </Card></Link>;