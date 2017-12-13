import * as React from "react";
import { Menu } from "semantic-ui-react";

interface IProps<T> {
    allItems: T[],
    onPageChanged: (page: T) => void;
}

interface IState<T> {
    allItems: T[]
}

export class Paginator<T> extends React.Component<IProps<T>, IState<T>> {

    constructor(props: IProps<T>) {
        super(props);
        this.state = {
            allItems: props.allItems
        }
    }

    componentWillReceiveProps(nextProps: IProps<T>) {
        this.setState({ allItems:nextProps.allItems });        
    }

    render() {

        const allItems = this.state.allItems;
        const pageCount = Math.round(allItems.length / 10);
        
        const pages = new Array(pageCount);

        console.log("pageCount", pageCount, pages)

        return <Menu pagination>
            {pages.map((_, i) => <Menu.Item name={`${i}`} active={false} />)}
        </Menu>
    }
}
