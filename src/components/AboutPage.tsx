import * as React from "react";
import { Segment, Container, Header, Embed } from "semantic-ui-react";

interface IProps {
}

interface IState {
}

export class AboutPage extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
    }
  }

  render() {

    return <div>

      <Segment style={{ padding: '4em 0em' }} vertical>
        <Container>
          <Header as="h1">About Above Under</Header>

          <p>
            Above Under is an Aerial photography business that supplies high quality unique prints from landscapes around Australia and beyond.
          </p>

          <Embed
            autoplay
            id='-Omn94QdlB8'
            source='youtube'
          />

          <p>
            <a href="/contact">Contact us</a> for more information.
          </p>

        </Container>
      </Segment>

    </div>
  }
}
