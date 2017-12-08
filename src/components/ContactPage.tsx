import * as React from "react";
import { Segment, Container, Header } from "semantic-ui-react";

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

    return <div>

      <Segment style={{ padding: '4em 0em' }} vertical>
        <Container>
          <Header as="h1">Contact Us</Header>

          Just email us yo!

        </Container>
      </Segment>

    </div>
  }
}
