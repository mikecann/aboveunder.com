import * as React from "react";
import { Segment, Container, Header, Embed } from "semantic-ui-react";
import { CommonPageLayout } from "../components/CommonPageLayout";
import { startPreloading } from "../routes";

interface IProps {}

interface IState {}

export default function AboutPage() {
  return (
    <CommonPageLayout activeMenu="home">
      <Segment style={{ padding: "4em 0em" }} vertical>
        <Container>
          <Header as="h1">About Above Under</Header>

          <p>
            Above Under is an Aerial photography business that supplies high quality unique prints
            from landscapes around Australia and beyond.
          </p>

          <Embed autoplay id="-Omn94QdlB8" source="youtube" />

          <p>
            <a href="/contact">Contact us</a> for more information.
          </p>
        </Container>
      </Segment>
    </CommonPageLayout>
  );
}

startPreloading();
