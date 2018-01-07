import * as React from "react";

import { IPrint } from "../lib/types";
import { Grid, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

interface IProps {
    product: IPrint;
}

interface IState {
    mouseOver?: boolean;
}

export class ProductThumb extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { product } = this.props;
        //const { mouseOver } = this.state;
        return <Grid.Column key={product.id}>
            <Link to={`/print/${product.id}`} onMouseOver={() => this.setState({ mouseOver: true })} onMouseOut={() => this.setState({ mouseOver: false })}>
                <Image rounded src={product.thumb} 
                    style={{ marginTop: "1em", marginBottom: "1em" }}
                    label={{ content: product.title, ribbon: true }}
                    />
            </Link>
        </Grid.Column>;
    }
}