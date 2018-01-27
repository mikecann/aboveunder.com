import * as React from "react";
import { Segment, Container, Header, Embed } from "semantic-ui-react";
import { CommonPageLayout } from "./CommonPageLayout";

interface IProps {
}

interface IState {
}

export class VideosPage extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
    }
  }

  render() {

    return <CommonPageLayout activeMenu="home">

      <Segment style={{ padding: '4em 0em' }} vertical>
        <Container>
          <Header as="h1">Above Under Videos</Header>

          <p>
            Above Under has made many high quality videos over the years. Most can be found on our <a href="https://www.youtube.com/channel/UCrgLfQ1_Z5QQx4JKmtxkxIg/videos">youtube channel</a> or <a href="https://www.facebook.com/pg/aboveunder/videos/">Facebook Page</a>
          </p>

          <Embed
            autoplay
            id='-Omn94QdlB8'
            source='youtube'
          />
       
        </Container>
      </Segment>

    </CommonPageLayout>
  }
}
