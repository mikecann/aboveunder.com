import * as React from "react";
import { Menu, Container, Button, Icon, MenuProps } from "semantic-ui-react";

interface IProps
{
    activeMenu: string;
    menuProps?: MenuProps;
}

export const HeaderMenu = (props:IProps) => 
    <Menu {...props.menuProps}>
      <Container>
        <Menu.Item as='a' active={props.activeMenu == "home"} href="/">Home</Menu.Item>
        <Menu.Item as='a' active={props.activeMenu == "shop"} href="/shop">Shop</Menu.Item>
        <Menu.Item as='a' active={props.activeMenu == "blog"} href="/blog">Blog</Menu.Item>
        <Menu.Item as='a' active={props.activeMenu == "contact"} href="/contact">Contact</Menu.Item>
        <Menu.Item position='right'>
          <Button inverted={props.menuProps ? props.menuProps.inverted : false} href="/shop">
            <Icon name="add to cart" />
          </Button>
          <Button inverted={props.menuProps ? props.menuProps.inverted : false} href="/shop">
            <Icon name="search" />
          </Button>
        </Menu.Item>
      </Container>
    </Menu>
  