import * as React from "react";
import { Menu, Container, Button, Icon, Image, MenuProps } from "semantic-ui-react";

interface IProps
{
    activeMenu: string;
    menuProps?: MenuProps;
    showLogo?: boolean;
}

export const HeaderMenu = (props:IProps) => 
    <Menu {...props.menuProps}>
      <Container>
        
        { 
          props.showLogo == true || props.showLogo === undefined ?  
          <Menu.Item header href="/" style={{padding: "0.4em"}}>
            <Image src="/static/images/header-logo.png" height={60} />
          </Menu.Item> 
          : null     
        }
        
        <Menu.Item as='a' active={props.activeMenu == "home"} href="/">Home</Menu.Item>
        <Menu.Item as='a' active={props.activeMenu == "shop"} href="/shop">Shop</Menu.Item>
        <Menu.Item as='a' active={props.activeMenu == "blog"} href="/blog">Blog</Menu.Item>
        <Menu.Item as='a' active={props.activeMenu == "contact"} href="/contact">Contact</Menu.Item>
        <Menu.Item position='right'>
          <Button inverted={props.menuProps ? props.menuProps.inverted : false} href="/shop">
            <Icon name="add to cart" />
          </Button>
          {/* <Button inverted={props.menuProps ? props.menuProps.inverted : false} href="/shop">
            <Icon name="search" />
          </Button> */}
        </Menu.Item>
      </Container>
    </Menu>
  