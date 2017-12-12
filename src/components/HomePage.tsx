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

interface IProps {
  featuredProducts: IPrint[],
  latestProducts: IPrint[],
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

  componentDidMount() : any {
    console.log("env", process.env);
  }

  render() {
    const { visible } = this.state
    const { featuredProducts, latestProducts, latestPosts } = this.props

    return (
      <div>
        {visible ? <HeaderMenu menuProps={{ fixed:"top", size:"huge" }} activeMenu="home" /> : null}

        <Visibility
          onBottomPassed={this.showFixedMenu}
          onBottomVisible={this.hideFixedMenu}
          once={false}
        >
          <Segment
            inverted
            textAlign='center'
            style={{
              minHeight: 700, backgroundImage: `url("/static/images/homepage-hero-image.jpg")`,
              backgroundSize: "cover", padding: '1em 0em', backroundColor: "black"
            }}
            vertical
          >
            <HeaderMenu showLogo={false} menuProps={{ inverted:true, pointing:true, secondary:true, style: {border:"none"}, size:"huge" }} activeMenu="home" />

            <Container text>
              <Image centered src="/static/images/logo-inverted.png" style={{ marginTop: '5em' }} />
              <Header
                as='h2'
                content='Beautiful Australian Photography'
                inverted
                style={{ fontSize: '2em', fontWeight: 'normal', marginBottom: 0 }}
              />
              <Header
                as='h2'
                content='taken from a unique perspective'
                inverted
                style={{ fontSize: '1.5em', fontWeight: 'normal', marginTop: 0 }}
              />
              <Button primary size='huge' href="/shop">
                View Gallery
                <Icon name="arrow right" />
              </Button>
            </Container>
          </Segment>
        </Visibility>

        <Segment style={{ padding: '8em 0em' }} vertical>
          <Container>
            <Grid>
              <Header as='h3' style={{ fontSize: '2em' }}>Featured Prints</Header>
              <Button href="/shop">
                View All
              </Button>
            </Grid>
            <ProductThumbGrid featureOneProduct products={featuredProducts} />
          </Container>
        </Segment>


        <Segment style={{ padding: '8em 0em' }} vertical>
          <Container>
            <Grid>
              <Header as='h3' style={{ fontSize: '2em' }}>Latest Prints</Header>
              <Button href="/shop">
                View All
              </Button>
            </Grid>
            <ProductThumbGrid products={latestProducts} />
          </Container>
        </Segment>


        <Segment style={{ padding: '8em 0em' }} vertical>
          <Container>
            <Grid>
                <Header as='h3' style={{ fontSize: '2em' }}>Latest Posts</Header>
                <Button href="/blog">
                  View All
                </Button>
            </Grid>
            <BlogPostsThumbGrid posts={latestPosts} />
          </Container>
        </Segment>
          
      </div>
    )
  }

  hideFixedMenu = () => this.setState({ visible: false })
  showFixedMenu = () => this.setState({ visible: true })
}