import * as React from "react";
import { IPost } from "../lib/types";
import * as ReactMarkdown from "react-markdown";
import { Segment, Container, Header } from "semantic-ui-react";

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

    const { post } = this.props;
    const markdown = this.state.markdown;

    return <div>

      

      <Segment style={{ padding: '4em 0em' }} vertical>
        <Container>
          <Header as="h1">{post.title}</Header>

          {markdown ? <ReactMarkdown source={markdown} /> : "Loading.."}

        </Container>
      </Segment>

    </div>
  }
}
