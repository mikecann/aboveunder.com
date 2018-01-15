import { Responsive, Menu, Container, Input, InputOnChangeData, Dropdown } from "semantic-ui-react";
import * as React from "react";

interface IShopPageMenuProps {
    fixToBottom?: boolean;
    orderOptions: { text: string, value: string }[];
    onSelectedOrderValueChanged: (value:string) => void;
    selectedOrderValue: string;
    searchTerm: string;
    onSearchTermChanged: (e: any, data: InputOnChangeData) => void;
}

export const ShopPageMenu = (props: IShopPageMenuProps) =>
    <React.Fragment>
        <Responsive maxWidth={650}>
            {renderTinyMenu(props)}
        </Responsive>
        <Responsive minWidth={650}>
            {renderNormalMenu(props)}
        </Responsive>
    </React.Fragment>

function renderNormalMenu(props: IShopPageMenuProps) {
    return <Menu pointing fixed={props.fixToBottom ? "bottom" : undefined}>
        <Container>
            {props.orderOptions.map(o => <Menu.Item 
                key={o.value} 
                name={o.text} 
                value={o.value} 
                active={props.selectedOrderValue === o.value}
                onClick={(e,o) => props.onSelectedOrderValueChanged(o.value+"")} 
                />)}
            <Menu.Menu position='right'>
                <Menu.Item>
                    <Input icon='search' placeholder='Search...' value={props.searchTerm} onChange={props.onSearchTermChanged} />
                </Menu.Item>
            </Menu.Menu>
        </Container>
    </Menu>
}

function renderTinyMenu(props: IShopPageMenuProps) {
    return <Menu pointing fixed={props.fixToBottom ? "bottom" : undefined}>
        <Container>
                <Dropdown 
                    item
                    options={props.orderOptions} 
                    onChange={(e,o) => props.onSelectedOrderValueChanged(o.value+"")} 
                    value={props.selectedOrderValue} 
                    upward={props.fixToBottom} 
                    />
            <Menu.Menu position='right'>
                <Menu.Item>
                    <Input icon='search' style={{minWidth: 140}} placeholder='Search...' fluid value={props.searchTerm} onChange={props.onSearchTermChanged} />
                </Menu.Item>
            </Menu.Menu>
        </Container>
    </Menu>
}