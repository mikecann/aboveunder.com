import * as React from "react";
import { Menu } from "semantic-ui-react";

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
        const pageCount = Math.round(numItems / pageSize);
        
        const pages = [];
        for(var i=0; i<pageCount; i++)
            pages.push(i);

        return <Menu pagination>
            {pages.map((i) => <Menu.Item key={`${i}`} name={`${i}`} active={i==pageIndex} onClick={() => this.handlePageClick(i)} />)}
        </Menu>
    }

    handlePageClick = (pageIndex:number) => {
        this.setState({pageIndex});       
        this.props.onPageChanged(pageIndex);
    } 
}
