import * as React from "react";
import { Segment, Container, Header } from "semantic-ui-react";
import { CommonPageLayout } from "./CommonPageLayout";

interface IProps {
}

interface IState {
}

export class ContactPage extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
    }
  }

  render() {

    return <CommonPageLayout activeMenu="contact">

      <Segment style={{ padding: '4em 0em' }} vertical text>
        <Container>
          <img src="/images/ralph-wave.gif" />
          <Header as="h1">Contact Us</Header>

          We'd love to hear from you. To contact us just email us: <a href="mailto:mike@aboveunder.com">mike@aboveunder.com</a> we will aim to get back to you as soon as we can.
        </Container>
      </Segment>

    </CommonPageLayout>
  }
}
