import * as React from "react";

import Link from 'next/link'
import { IProduct } from "../lib/types";
import { Grid, Image, Segment, Label } from "semantic-ui-react";


interface IProps {
    product: IProduct;
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
        const { mouseOver } = this.state;
        return <Grid.Column>
            <Link href={{ pathname: '/product', query: { id: product.id } }} as={`/product/${product.id}`}>
                <a onMouseOver={() => this.setState({ mouseOver: true })} onMouseOut={() => this.setState({ mouseOver: false })}>
                    <Image rounded src={product.thumb} 
                        style={{ marginTop: "1em", marginBottom: "1em" }}
                        label={{ content: product.title, ribbon: true }}
                     />
                </a>
            </Link>

        </Grid.Column>;
    }
}