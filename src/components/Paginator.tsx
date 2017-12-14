import * as React from "react";
import { Menu, Icon } from "semantic-ui-react";

interface IProps {
    numItems:number;
    pageSize:number;
    pageIndex:number;
    onPageChanged: (page: number) => void;
}

interface IState {
    pageIndex: number;
}

export class Paginator extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            pageIndex: props.pageIndex
        }
    }

    componentWillReceiveProps(nextProps: IProps) {
        if (nextProps.pageIndex == this.state.pageIndex)
            return;

        this.setState({ pageIndex:nextProps.pageIndex });       
    }

    render() {

        const {numItems, pageSize} = this.props;
        const {pageIndex} = this.state;
        const pageCount = Math.ceil(numItems / pageSize);
        
        const pages = [];

        for(var i=0; i<pageCount; i++)
            pages.push(i);

        return <Menu pagination>
            <Menu.Item key="page-left" disabled={pageIndex==0} onClick={() => this.handlePageClick(pageIndex-1)}>
                <Icon name="arrow left" />
            </Menu.Item>
            {pages.map((i) => <Menu.Item key={`${i}`} name={`${i+1}`} active={i==pageIndex} onClick={() => this.handlePageClick(i)} />)}
            <Menu.Item key="page-right" disabled={pageIndex==pageCount-1} onClick={() => this.handlePageClick(pageIndex+1)}>
                <Icon name="arrow right" />
            </Menu.Item>
        </Menu>
    }

    handlePageClick = (pageIndex:number) => {
        this.setState({pageIndex});       
        this.props.onPageChanged(pageIndex);
    } 
}
