import * as React from "react";
import Link from 'next/link'
import { IPost } from "../lib/types";
import { AUHeader } from "./AUHeader";
import * as ReactMarkdown from "react-markdown";

interface IProps {
  post: IPost
}

interface IState {
  markdown?: string;
}

export class PostPage extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
    }
  }

  async componentDidMount() {
    const mdFile = this.props.post.markdownFileName;
    var response = await fetch(`/static/posts/${mdFile}`);
    var markdown = await response.text();
    this.setState({ markdown });
  } 
 
  render() {

    const {post} = this.props;
    const markdown = this.state.markdown;

    return <div>
      
      <AUHeader />

        <h1>{post.title}</h1>

        { markdown ? <ReactMarkdown source={markdown} /> : "Loading.." }

        <Link href='/'>
          <a>Go back to home</a>
        </Link>


    </div>
  }
}
