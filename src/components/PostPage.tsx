import * as React from "react";
import { IPost } from "../lib/types";
import * as ReactMarkdown from "react-markdown";
import { Segment, Container, Header, Breadcrumb, Icon } from "semantic-ui-react";
import { CommonPageLayout } from "./CommonPageLayout";

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
    var response = await fetch(`/posts/${mdFile}`);
    var markdown = await response.text();
    this.setState({ markdown });
  }

  render() {

    const { post } = this.props;
    const markdown = this.state.markdown;

    return <CommonPageLayout activeMenu="blog">

      <Segment style={{ padding: '4em 0em' }} vertical>
        <Container>

          <div style={{ marginBottom: "2em" }}>
            <Breadcrumb size='large'>
              <Breadcrumb.Section link href="/shop"><Icon name="book" />Blog</Breadcrumb.Section>
              <Breadcrumb.Divider icon='right chevron' />
              <Breadcrumb.Section>{post.title}</Breadcrumb.Section>
            </Breadcrumb>
          </div>

          <Header as="h1">{post.title}</Header>

          {markdown ? <ReactMarkdown source={markdown} /> : "Loading.."}

        </Container>
      </Segment>

    </CommonPageLayout>
  }
}
