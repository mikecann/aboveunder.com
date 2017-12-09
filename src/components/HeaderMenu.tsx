import * as React from "react";
import { Menu, Container, Icon, Image, MenuProps } from "semantic-ui-react";

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
          <Menu.Item as="a" className="snipcart-user-profile">
                <Icon name="user circle outline" />
          </Menu.Item>
          
          <Menu.Item as="a" className="snipcart-checkout">
              <div className="snipcart-summary">
                <Icon name="add to cart" />
                <span className="snipcart-total-price" />
              </div>
          </Menu.Item>
        </Menu.Item>
      

      </Container>
    </Menu>
  