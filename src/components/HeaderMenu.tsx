import * as React from "react";
import { Menu, Container, Icon, Image, MenuProps, Responsive } from "semantic-ui-react";

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
          <Responsive minWidth={768}>
            <Menu.Item header href="/" style={{padding: "0.4em"}}>
              <Image src="/images/header-logo.png" height={60} />
            </Menu.Item>
          </Responsive>
          : null     
        }
        
        <Menu.Item as='a' active={props.activeMenu == "home"} href="/">Home</Menu.Item>
        <Menu.Item as='a' active={props.activeMenu == "shop"} href="/shop">Shop</Menu.Item>
        <Menu.Item as='a' active={props.activeMenu == "blog"} href="/blog">Blog</Menu.Item>
        <Menu.Item as='a' active={props.activeMenu == "contact"} href="/contact">Contact</Menu.Item>
        
        <Menu.Menu position='right'>
          <Menu.Item as="a" className="snipcart-user-profile">
                <Icon name="user circle outline" />
          </Menu.Item>
          
          <Menu.Item as="a" className="snipcart-checkout">
              <div className="snipcart-summary">
                <Icon name="add to cart" />
                <span className="snipcart-total-price" />
              </div>
          </Menu.Item>
        </Menu.Menu>
      

      </Container>
    </Menu>
  