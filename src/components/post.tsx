import Link from 'next/link'
import * as React from "react";
import { IPost } from '../lib/types';

export default (props : IPost) =>
  <article>
    <h2>{props.title}</h2>
    <p>{props.body}</p>
    {/* render the URL as /post/:id */}
    <Link href={{ pathname: '/post', query: { id: props.id } }} as={`/post/${props.id}`}>
      <a>Read more...</a>
    </Link>
  </article>
