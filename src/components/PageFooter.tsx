
import * as React from "react";
import { Segment, Grid, Header, List, Container, Icon } from "semantic-ui-react";

export const PageFooter = () =>
    <Segment inverted vertical style={{ padding: '5em 0em' }}>
        <Container>
            <Grid divided inverted stackable>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <Header inverted as='h4' content='Pages' />
                        <List link inverted>
                            <List.Item as='a' href="/home">Home</List.Item>
                            <List.Item as='a' href="/shop">Shop</List.Item>
                            <List.Item as='a' href="#" className="snipcart-user-profile">User Profile</List.Item>
                        </List>
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <Header inverted as='h4' content='Media' />
                        <List link inverted>
                            <List.Item as='a' href="/blog">Blog</List.Item>
                            <List.Item as='a' href="/videos">Videos</List.Item>
                            <List.Item as='a' href="/map">Map</List.Item>
                        </List>
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <Header inverted as='h4' content='About' />
                        <List link inverted>
                            <List.Item as='a' href="/contact">Contact Us</List.Item>
                            <List.Item as='a' href="/about">About</List.Item>
                        </List>
                    </Grid.Column>
                    <Grid.Column width={7}>
                        <Header as='h4' inverted>© Above Under 2018</Header>
                        <p>Beautiful Australian Photography, taken from a unique perspective.</p>
                        <a href="//twitter.com/aboveunder_"><Icon inverted name='twitter' /></a>
                        <a href="//instagram.com/aboveunder_"><Icon inverted name='instagram' /></a>
                        <a href="//facebook.com/aboveunder"><Icon inverted name='facebook' /></a>
                        <a href="mailto:mike@aboveunder.com"><Icon inverted name='mail' /></a>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    </Segment>