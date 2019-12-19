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
} from "semantic-ui-react";
import { BlogPostsThumbGrid } from "../blog/BlogPostsThumbGrid";
import { HeaderMenu } from "../components/HeaderMenu";
import { PageFooter } from "../components/PageFooter";
import { Link } from "react-router-dom";
import { useDb } from "../hooks/useDb";
import { LoadingPage } from "../loading/LoadingPage";
import { latestPrints, featuredPrints, latestPosts } from "../lib/db";
import { startPreloading } from "../routes";
import { PrintsMap } from "../map/PrintsMap";
import { useResponsive } from "../hooks/useResponsive";
import { Vertical } from "gls/lib";
import { ProductThumbGrid, thumbsPerRow } from "../components/ProductThumbGrid";
import { useWindowSize } from "../hooks/useWindowSize";
import { Helmet } from "react-helmet";

interface Props {}

interface State {
  latestPrints: IPrint[];
  featuredPrints: IPrint[];
}

export default function HomePage({}: Props) {
  const [db] = useDb();

  const [visible, setVisible] = React.useState(false);
  const hideFixedMenu = () => setVisible(false);
  const showFixedMenu = () => setVisible(true);
  const responsive = useResponsive();
  const { innerWidth } = useWindowSize();

  const [state, setState] = React.useState<State>({
    featuredPrints: [],
    latestPrints: [],
  });

  React.useEffect(() => {
    if (!db) return;
    setState({
      latestPrints: latestPrints(db),
      featuredPrints: featuredPrints(db),
    });
  }, [db]);

  if (!db) return <LoadingPage />;

  const thumbsToShow = thumbsPerRow(innerWidth) * 4;
  const numMorePrints = state.latestPrints.length - thumbsToShow;

  return (
    <div>
      <Helmet>
        <title>Above Under</title>
      </Helmet>
      <div>
        {visible ? (
          <HeaderMenu menuProps={{ fixed: "top", size: "huge" }} activeMenu="home" />
        ) : null}

        <Visibility onBottomPassed={showFixedMenu} onBottomVisible={hideFixedMenu} once={false}>
          <Segment
            textAlign="center"
            style={{
              minHeight: 700,
              backgroundImage: `url("/images/homepage-hero-image.jpg")`,
              backgroundSize: "cover",
              padding: "1em 0em",
              backroundColor: "black",
              position: "relative",
            }}
            vertical
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: -1,
                pointerEvents: "none",
              }}
            >
              {/* <video
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                }}
                autoPlay
                playsInline
                loop
                //controls
                src="./images/video-hero.m4v"
              /> */}
            </div>

            <HeaderMenu
              showLogo={false}
              menuProps={{
                inverted: true,
                pointing: true,
                secondary: true,
                style: { border: "none" },
                size: "huge",
              }}
              activeMenu="home"
            />

            <Container text>
              <Image centered src="/images/logo-inverted.png" style={{ marginTop: "5em" }} />
              <Header
                as="h2"
                content="Beautiful Australian Photography"
                inverted
                style={{
                  fontSize: "2em",
                  fontWeight: "normal",
                  marginBottom: 0,
                  textShadow: "#33333394 0px 2px 5px",
                }}
              />
              <Header
                as="h2"
                content="taken from a unique perspective"
                inverted
                style={{
                  fontSize: "1.5em",
                  fontWeight: "normal",
                  marginTop: 0,
                  textShadow: "#33333394 0px 2px 5px",
                }}
              />
              <Button
                as={Link}
                primary
                size="huge"
                to="/shop"
                style={{ boxShadow: "#33333394 0px 2px 5px" }}
              >
                View Gallery
                <Icon name="arrow right" />
              </Button>
            </Container>
          </Segment>
        </Visibility>

        <Segment
          style={{
            paddingTop: "4em",
            paddingBottom: "4em",
            paddingLeft: responsive.margin,
            paddingRight: responsive.margin,
          }}
          vertical
        >
          <Vertical horizontalAlign="center">
            <SectionHeading label="Featured Prints" href="/shop" />
            <ProductThumbGrid products={state.featuredPrints.slice(0, thumbsToShow)} />
            <div style={{ textAlign: "center", marginTop: 20 }}>
              <Button as={Link} to="/shop" size="huge" primary>
                View All
                <Icon name="arrow right" />
              </Button>
            </div>
          </Vertical>
        </Segment>

        <Container fluid>
          <PrintsMap prints={db.prints} />
        </Container>

        <Segment style={{ padding: "4em 0em" }} vertical>
          <Vertical horizontalAlign="center">
            <SectionHeading label="Latest Prints" href="/shop" />
            <ProductThumbGrid products={state.latestPrints.slice(0, thumbsToShow)} />
          </Vertical>
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <Button as={Link} to="/shop" size="huge" primary>
              {numMorePrints} More
              <Icon name="arrow right" />
            </Button>
          </div>
        </Segment>

        <Segment style={{ padding: "8em 0em" }} vertical>
          <Container>
            <SectionHeading label="Latest Blog Posts" href="/blog" />
            <BlogPostsThumbGrid posts={latestPosts(db)} />
          </Container>
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <Button as={Link} to="/blog" size="huge" primary>
              Blog Roll
              <Icon name="arrow right" />
            </Button>
          </div>
        </Segment>
      </div>
      <PageFooter />
    </div>
  );
}

const SectionHeading = (props: { href: string; label: string }) => (
  <Grid>
    <Grid.Column>
      <Link to={props.href}>
        <Header as="h3" style={{ fontSize: "2em" }}>
          {props.label}
          {/* <Button href={props.href} size="mini" style={{ marginLeft: 20, marginBottom: 10 }}>
            View All
          </Button> */}
        </Header>
      </Link>
    </Grid.Column>
  </Grid>
);

startPreloading();
