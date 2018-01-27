import * as React from "react";
import { Menu, Container, Icon, Image, MenuProps, Responsive, Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";

interface IProps
{
    activeMenu: string;
    menuProps?: MenuProps;
    showLogo?: boolean;
}

const menuItems = [
  {
    id: "home",
    url: "/",
    label: "Home"
  },
  {
    id: "shop",
    url: "/shop",
    label: "Shop"
  },
  {
    id: "blog",
    url: "/blog",
    label: "Blog"
  },
  {
    id: "contact",
    url: "/contact",
    label: "Contact"
  },
  {
    id: "videos",
    url: "/videos",
    label: "Videos"
  }
]

export const HeaderMenu = (props:IProps) => 
  <React.Fragment>
      <Responsive maxWidth={650}>
        {renderTinyMenu(props)}
      </Responsive>
      <Responsive minWidth={650}>
        {renderNormalMenu(props)}
      </Responsive>
    </React.Fragment>

function renderTinyMenu(props:IProps)
{
  return <Menu {...props.menuProps}>
  <Container>
    
    { 
      props.showLogo == true || props.showLogo === undefined ?  
        <Menu.Item header href="/" style={{padding: "0.4em"}}>
          <Image src="/images/Above-Under-Square-Logo-150x150.png" height={60} />
        </Menu.Item>
      : null     
    }

      <Dropdown item icon="bars">
        <Dropdown.Menu>
          {menuItems.map(o => <Dropdown.Item key={o.id} as={Link} to={o.url} style={{ borderBottom: "1px solid rgb(222, 222, 222)", width: 160 }}> {o.label}</Dropdown.Item>)}
        </Dropdown.Menu>
      </Dropdown>
    
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
}

function renderNormalMenu(props:IProps)
{
  return <Menu {...props.menuProps}>
  <Container>
    
    { 
      props.showLogo == true || props.showLogo === undefined ?  
        <Menu.Item header href="/" style={{padding: "0.4em"}}>
          <Image src="/images/header-logo.png" height={60} />
        </Menu.Item>
      : null     
    }

    { menuItems.map(o => <Menu.Item key={o.id} as={Link} active={props.activeMenu == o.id} to={o.url}>{o.label}</Menu.Item>) }
    
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
}
    
  