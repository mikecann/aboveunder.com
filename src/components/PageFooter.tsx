
import * as React from "react";
import { Segment, Grid, Header, List, Container } from "semantic-ui-react";

export const PageFooter = () =>
    <Segment inverted vertical style={{ padding: '5em 0em' }}>
        <Container>
            <Grid divided inverted stackable>
                <Grid.Row>
                    <Grid.Column width={3}>
                        <Header inverted as='h4' content='About' />
                        <List link inverted>
                            <List.Item as='a' href="/contact">Contact Us</List.Item>
                        </List>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <Header inverted as='h4' content='Pages' />
                        <List link inverted>
                            <List.Item as='a' href="/home">Home</List.Item>
                            <List.Item as='a' href="/shop">Shop</List.Item>
                            <List.Item as='a' href="/blog">Blog</List.Item>
                        </List>
                    </Grid.Column>
                    <Grid.Column width={7}>
                        <Header as='h4' inverted>Above Under</Header>
                        <p>Beautiful Australian Photography, taken from a unique perspective.</p>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    </Segment>