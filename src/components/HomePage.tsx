import * as React from "react";
import { IPost, IProduct } from "../lib/types";
import Link from 'next/link'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Visibility,
} from 'semantic-ui-react'

interface IProps {
  featuredProducts: IProduct[],
  allProducts: IProduct[],
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
            style={{ minHeight: 700, backgroundImage:`url("/static/images/homepage-hero-image.jpg")`, 
              backgroundSize: "cover", padding: '1em 0em', backroundColor: "black" }}
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
          <Grid container stackable verticalAlign='middle'>
            <Grid.Row>
              <Grid.Column width={8}>
                <Header as='h3' style={{ fontSize: '2em' }}>We Help Companies and Companions</Header>
                <p style={{ fontSize: '1.33em' }}>
                  We can give your company superpowers to do things that they never thought possible. Let us delight
                  your customers and empower your needs... through pure data analytics.
                </p>
                <Header as='h3' style={{ fontSize: '2em' }}>We Make Bananas That Can Dance</Header>
                <p style={{ fontSize: '1.33em' }}>
                  Yes that's right, you thought it was the stuff of dreams, but even bananas can be bioengineered.
                </p>
              </Grid.Column>
              <Grid.Column floated='right' width={6}>
                <Image
                  bordered
                  rounded
                  size='large'
                  src='/assets/images/wireframe/white-image.png'
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign='center'>
                <Button size='huge'>Check Them Out</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment style={{ padding: '0em' }} vertical>
          <Grid celled='internally' columns='equal' stackable>
            <Grid.Row textAlign='center'>
              <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                <Header as='h3' style={{ fontSize: '2em' }}>"What a Company"</Header>
                <p style={{ fontSize: '1.33em' }}>That is what they all say about us</p>
              </Grid.Column>
              <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                <Header as='h3' style={{ fontSize: '2em' }}>"I shouldn't have gone with their competitor."</Header>
                <p style={{ fontSize: '1.33em' }}>
                  <Image avatar src='/assets/images/avatar/large/nan.jpg' />
                  <b>Nan</b> Chief Fun Officer Acme Toys
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment style={{ padding: '8em 0em' }} vertical>
          <Container text>
            <Header as='h3' style={{ fontSize: '2em' }}>Breaking The Grid, Grabs Your Attention</Header>
            <p style={{ fontSize: '1.33em' }}>
              Instead of focusing on content creation and hard work, we have learned how to master the art of doing
              nothing by providing massive amounts of whitespace and generic content that can seem massive, monolithic
              and worth your attention.
            </p>
            <Button as='a' size='large'>Read More</Button>
            <Divider
              as='h4'
              className='header'
              horizontal
              style={{ margin: '3em 0em', textTransform: 'uppercase' }}
            >
              <a href='#'>Case Studies</a>
            </Divider>
            <Header as='h3' style={{ fontSize: '2em' }}>Did We Tell You About Our Bananas?</Header>
            <p style={{ fontSize: '1.33em' }}>
              Yes I know you probably disregarded the earlier boasts as non-sequitur filler content, but it's really
              true.
              It took years of gene splicing and combinatory DNA research, but our bananas can really dance.
            </p>
            <Button as='a' size='large'>I'm Still Quite Interested</Button>
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

  // render() {

  //   const {featuredProducts, allProducts, latestPosts} = this.props;
  //   const { visible } = this.state

  //   return <div>

  //     { visible ? <FixedMenu /> : null }

  //     <h1>Featured Images</h1>

  //     <section>
  //       <ProductThumbsList products={featuredProducts} />
  //     </section>

  //     <h1>All Images</h1>

  //     <section>
  //       <ProductThumbsList products={allProducts} />
  //     </section>

  //     <h1>Blog Posts</h1>

  //     <section>
  //       {latestPosts.map(post => <BlogPostSummary {...post} key={post.id} />)}
  //     </section>


  //   </div>
  // }

  hideFixedMenu = () => this.setState({ visible: false })
  showFixedMenu = () => this.setState({ visible: true })
}

const FixedMenu = () => (
  <Menu fixed='top' size='large'>
    <Container>
      <Menu.Item as='a' active>Home</Menu.Item>
      <Menu.Item as='a'>Work</Menu.Item>
      <Menu.Item as='a'>Company</Menu.Item>
      <Menu.Item as='a'>Careers</Menu.Item>
      <Menu.Menu position='right'>
        <Menu.Item className='item'>
          <Button as='a'>Log in</Button>
        </Menu.Item>
        <Menu.Item>
          <Button as='a' primary>Sign Up</Button>
        </Menu.Item>
      </Menu.Menu>
    </Container>
  </Menu>
)