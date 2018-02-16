import * as React from "react";
import { IPost, IPrint } from "../lib/types";
import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Segment,
  Visibility,
  Image,
} from 'semantic-ui-react'
import { ProductThumbGrid } from "./ProductThumbGrid";
import { BlogPostsThumbGrid } from "./BlogPostsThumbGrid";
import { HeaderMenu } from "./HeaderMenu";
import { PageFooter } from "./PageFooter";
import { Link } from "react-router-dom";
import { HomePageVideo } from "./HomePageVideo";

interface IProps {
  featuredPrints: IPrint[],
  latestPrints: IPrint[],
  latestPosts: IPost[]
}

interface IState {
  visible: boolean;
}

export class HomePage extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
      visible: false
    }
  }

  componentDidMount(): any {
    console.log("env", process.env);
  }

  render() {
    const { visible } = this.state
    const { featuredPrints, latestPrints, latestPosts } = this.props

    return <div>
      <div>
        {visible ? <HeaderMenu menuProps={{ fixed: "top", size: "huge" }} activeMenu="home" /> : null}

        <Visibility
          onBottomPassed={this.showFixedMenu}
          onBottomVisible={this.hideFixedMenu}
          once={false}
        >
          <Segment
            inverted
            textAlign='center'
            style={{
              minHeight: 700, backgroundImage: `url("/images/homepage-hero-image.jpg")`,
              backgroundSize: "cover", padding: '1em 0em', backroundColor: "black"
            }}
            vertical
          >

            <div style={{
              width: "100%", height: "100%", background: "rgba(0, 0, 0, 0.1)", position: "absolute", top: 0, left: 0, pointerEvents: "none"
            }} />

            <HeaderMenu showLogo={false} menuProps={{ inverted: true, pointing: true, secondary: true, style: { border: "none" }, size: "huge" }} activeMenu="home" />

            <Container text>
              <Image centered src="/images/logo-inverted.png" style={{ marginTop: '5em' }} />
              <Header
                as='h2'
                content='Beautiful Australian Photography'
                inverted
                style={{ fontSize: '2em', fontWeight: 'normal', marginBottom: 0, textShadow: "#33333394 0px 2px" }}
              />
              <Header
                as='h2'
                content='taken from a unique perspective'
                inverted
                style={{ fontSize: '1.5em', fontWeight: 'normal', marginTop: 0, textShadow: "#33333394 0px 2px" }}
              />
              <Button as={Link} primary size='huge' to="/shop">
                View Gallery
                <Icon name="arrow right" />
              </Button>
            </Container>
          </Segment>
        </Visibility>

        <Segment style={{ padding: '8em 0em' }} vertical>
          <Container>
            <SectionHeading label="Featured Prints" href="/shop" />
            <ProductThumbGrid featureOneProduct products={featuredPrints} />
          </Container>
        </Segment>

        <Segment style={{ padding: '8em 0em' }} vertical>
          <Container>
            <SectionHeading label="Video Feed" href="/videos" />
            <HomePageVideo />
          </Container>
        </Segment>

        <Segment style={{ padding: '8em 0em' }} vertical>
          <Container>
          <SectionHeading label="Latest Prints" href="/shop" />
            <ProductThumbGrid products={latestPrints} />
          </Container>
        </Segment>

        <Segment style={{ padding: '8em 0em' }} vertical>
          <Container>
            <SectionHeading label="Latest Blog Posts" href="/blog" />
            <BlogPostsThumbGrid posts={latestPosts} />
          </Container>
        </Segment>

      </div>
      <PageFooter />
    </div>
  }

  hideFixedMenu = () => this.setState({ visible: false })
  showFixedMenu = () => this.setState({ visible: true })
}

const SectionHeading = (props:{href:string, label:string}) => 
  <Grid>
    <Grid.Column>
      <Header as='h3' style={{ fontSize: '2em' }}>
        {props.label}
        <Button href={props.href} size="mini" style={{ marginLeft: 20, marginBottom: 10 }}>
          View All
        </Button>
      </Header>
    </Grid.Column>
  </Grid>