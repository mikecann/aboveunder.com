import * as React from "react";

import { IPrint } from "../lib/types";
import { Grid, Image, Button, Icon, Dimmer, Loader } from "semantic-ui-react";
import { Link } from "react-router-dom";

interface IProps {
  print: IPrint;
  useFull?: boolean;
}

interface IState {
  mouseOver?: boolean;
  isLoading?: boolean;
}

export class ProductThumb extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  render() {
    const { print, useFull } = this.props;
    const { isLoading } = this.state;
    return (
      <Grid.Column key={print.id}>
        <div className="print-thumb" style={{ minHeight: 300, minWidth: 250 }}>
          <div style={{ position: "relative" }}>
            <Dimmer active={isLoading} inverted style={{ minHeight: 300, minWidth: 250 }}>
              <Loader />
            </Dimmer>

            <Link
              to={`/print/${print.id}`}
              onMouseOver={() => this.setState({ mouseOver: true })}
              onMouseOut={() => this.setState({ mouseOver: false })}
            >
              <Image
                alt={print.title}
                rounded
                src={useFull ? print.image : print.thumb}
                srcSet={useFull ? print.image : `${print.thumb2x} 2x`}
                style={{ marginTop: "1em", marginBottom: "1em" }}
                label={{
                  content: print.title,
                  ribbon: true,
                  icon: print.featured ? <Icon name="star" style={{ color: "gold" }} /> : null,
                }}
                onLoad={() => this.setState({ isLoading: false })}
              ></Image>
            </Link>

            <Button
              circular
              size="mini"
              as={Link}
              to={`/map/${print.id}`}
              icon
              style={{ position: "absolute", bottom: 20, right: 5 }}
            >
              <Icon name="marker" />
            </Button>
          </div>
        </div>
      </Grid.Column>
    );
  }
}
