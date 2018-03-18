import * as React from "react";

import { IPrint } from "../lib/types";
import { Grid, Image, Button, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

interface IProps {
    print: IPrint;
    useFull?: boolean;
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
        const { print, useFull } = this.props;
        //const { mouseOver } = this.state;
        return <Grid.Column key={print.id}>
            <div className="print-thumb" style={{minHeight: 200, minWidth: 200}}>

                <div style={{position: "relative"}}>
                    <Link to={`/print/${print.id}`} onMouseOver={() => this.setState({ mouseOver: true })} onMouseOut={() => this.setState({ mouseOver: false })}>
                        <Image rounded src={useFull ? print.image : print.thumb}
                            style={{ marginTop: "1em", marginBottom: "1em" }}
                            label={{ content: print.title, ribbon: true, icon: print.featured ? "star" : undefined }}
                        >
                        </ Image>

                    </Link>

                    <Button circular size="mini" as={Link} to={`/map/${print.id}`} icon style={{ position:"absolute", bottom: 20, right: 5 }}>
                        <Icon name="marker" />
                    </Button>
                </div>
            </div>

        </Grid.Column>;
    }
}