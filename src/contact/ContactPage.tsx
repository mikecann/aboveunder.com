import * as React from "react";
import { Segment, Container, Header } from "semantic-ui-react";
import { CommonPageLayout } from "../components/CommonPageLayout";
import { startPreloading } from "../routes";
import { Helmet } from "react-helmet";

interface IProps {}

interface IState {}

export default function ContactPage() {
  return (
    <CommonPageLayout activeMenu="contact">
      <Helmet>
        <title>Above Under - Contact</title>
      </Helmet>
      <Segment style={{ padding: "4em 0em" }} vertical text>
        <Container>
          <img alt="ralph from simpsons waving" src="/images/ralph-wave.gif" />
          <Header as="h1">Contact Us</Header>
          We'd love to hear from you. To contact us just email us:{" "}
          <a href="mailto:mike@aboveunder.com">mike@aboveunder.com</a> we will aim to get back to
          you as soon as we can.
        </Container>
      </Segment>
    </CommonPageLayout>
  );
}

startPreloading();
