import Link from 'next/link'
import * as React from "react";
import { IPost } from '../lib/types';
import * as moment from "moment";

export const BlogPostSummary = (props : IPost) =>
  <article>
    <h2>{props.title}</h2>
    <h3>{moment(props.dateCreated).calendar()}</h3>
    <p>{props.summary}</p>
    {/* render the URL as /post/:id */}
    <Link href={{ pathname: '/post', query: { id: props.id } }} as={`/post/${props.id}`}>
      <a>Read more...</a>
    </Link>
  </article>
