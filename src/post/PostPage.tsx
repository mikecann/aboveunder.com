import * as React from "react";
import { IPost } from "../lib/types";
import * as ReactMarkdown from "react-markdown";
import { Segment, Container, Header, Breadcrumb, Icon } from "semantic-ui-react";
import { CommonPageLayout } from "../components/CommonPageLayout";
import { startPreloading } from "../routes";
import { useDb } from "../hooks/useDb";
import { LoadingPage } from "../loading/LoadingPage";
import { useParams } from "react-router";
import { getPost } from "../lib/db";
import { Helmet } from "react-helmet";

interface Params {
  id: string;
}

export default function PostPage() {
  const [markdown, setMarkdown] = React.useState("");
  const [db] = useDb();
  const params = useParams<Params>();

  React.useEffect(() => {
    if (!db) return;
    const post = getPost(db, params.id);
    fetch(`/posts/${post.markdownFileName}`)
      .then(resp => resp.text())
      .then(setMarkdown);
  }, [db]);

  if (!db) return <LoadingPage />;

  const post = getPost(db, params.id);

  return (
    <CommonPageLayout activeMenu="blog">
      <Helmet>
        <title>{post.title} - Above Under</title>
      </Helmet>
      <Segment className="blogPostPage" style={{ padding: "4em 0em" }} vertical>
        <Container>
          <div style={{ marginBottom: "2em" }}>
            <Breadcrumb size="large">
              <Breadcrumb.Section link href="/blog">
                <Icon name="book" />
                Blog
              </Breadcrumb.Section>
              <Breadcrumb.Divider icon="right chevron" />
              <Breadcrumb.Section>{post.title}</Breadcrumb.Section>
            </Breadcrumb>
          </div>

          <Header as="h1">{post.title}</Header>

          {markdown ? <ReactMarkdown source={markdown} /> : "Loading.."}
        </Container>
      </Segment>
    </CommonPageLayout>
  );
}

startPreloading();
