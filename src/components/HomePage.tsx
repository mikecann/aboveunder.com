import * as React from "react";
import { IPost, IProduct } from "../lib/types";
import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  List,
  Menu,
  Segment,
  Visibility,
} from 'semantic-ui-react'
import { ProductThumbGrid } from "./ProductThumbGrid";
import { BlogPostsThumbGrid } from "./BlogPostsThumbGrid";

interface IProps {
  featuredProducts: IProduct[],
  latestProducts: IProduct[],
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

  render() {
    const { visible } = this.state
    const { featuredProducts, latestProducts, latestPosts } = this.props

    return (
      <div>
        {visible ? <FixedMenu /> : null}

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
            <Container>
              <Menu inverted pointing secondary size='large' style={{ border: "none" }}>
                <Menu.Item as='a' active href="/">Home</Menu.Item>
                <Menu.Item as='a' href="/shop">Shop</Menu.Item>
                <Menu.Item as='a' href="/blog">Blog</Menu.Item>
                <Menu.Item as='a' href="/contact">Contact</Menu.Item>
                <Menu.Item position='right'>
                  <Button inverted href="/shop">
                    <Icon name="add to cart" />
                  </Button>
                  <Button inverted href="/shop">
                    <Icon name="search" />
                  </Button>
                </Menu.Item>
              </Menu>
            </Container>

            <Container text>
              <Header
                as='h1'
                content='Above Under'
                inverted
                style={{ fontSize: '4em', fontWeight: 'normal', marginBottom: 0, marginTop: '3em' }}
              />
              <Header
                as='h2'
                content='Beautiful Australian Photography, taken from a unique perspective'
                inverted
                style={{ fontSize: '1.7em', fontWeight: 'normal' }}
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
            <Header as='h3' style={{ fontSize: '2em' }}>Featured Prints</Header>
            <ProductThumbGrid featureOneProduct products={featuredProducts} />
          </Container>
        </Segment>


        <Segment style={{ padding: '8em 0em' }} vertical>
          <Container>
            <Header as='h3' style={{ fontSize: '2em' }}>Latest Prints</Header>
            <ProductThumbGrid products={latestProducts} />
          </Container>
        </Segment>


        <Segment style={{ padding: '8em 0em' }} vertical>
          <Container>
            <Header as='h3' style={{ fontSize: '2em' }}>Latest Posts</Header>
            <BlogPostsThumbGrid posts={latestPosts} />
          </Container>
        </Segment>

        <Segment inverted vertical style={{ padding: '5em 0em' }}>
          <Container>
            <Grid divided inverted stackable>
              <Grid.Row>
                <Grid.Column width={3}>
                  <Header inverted as='h4' content='About' />
                  <List link inverted>
                    <List.Item as='a'>Sitemap</List.Item>
                    <List.Item as='a'>Contact Us</List.Item>
                    <List.Item as='a'>Religious Ceremonies</List.Item>
                    <List.Item as='a'>Gazebo Plans</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={3}>
                  <Header inverted as='h4' content='Services' />
                  <List link inverted>
                    <List.Item as='a'>Banana Pre-Order</List.Item>
                    <List.Item as='a'>DNA FAQ</List.Item>
                    <List.Item as='a'>How To Access</List.Item>
                    <List.Item as='a'>Favorite X-Men</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={7}>
                  <Header as='h4' inverted>Footer Header</Header>
                  <p>Extra space for a call to action inside the footer that could help re-engage users.</p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>
      </div>
    )
  }

  hideFixedMenu = () => this.setState({ visible: false })
  showFixedMenu = () => this.setState({ visible: true })
}

const FixedMenu = () => (
  <Menu fixed='top' size='large'>
    <Container>
      <Menu.Item as='a' active href="/">Home</Menu.Item>
      <Menu.Item as='a' href="/shop">Shop</Menu.Item>
      <Menu.Item as='a' href="/blog">Blog</Menu.Item>
      <Menu.Item as='a' href="/contact">Contact</Menu.Item>
      <Menu.Item position='right'>
        <Button href="/shop">
          <Icon name="add to cart" />
        </Button>
        <Button href="/shop">
          <Icon name="search" />
        </Button>
      </Menu.Item>
    </Container>
  </Menu>
)