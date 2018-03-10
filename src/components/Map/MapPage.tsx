import * as React from "react";
import { Segment, Container, Header } from "semantic-ui-react";
import { IPrint } from "../../lib/types";
import { CommonPageLayout } from "../CommonPageLayout";
import * as H from 'history';
import { PrintsMap } from "./PrintsMap";

interface IProps {
  prints: IPrint[];
  selectedPrintId?: string;
  history: H.History;
}

export class MapPage extends React.Component<IProps, any> {

  render() {

    const { prints, selectedPrintId } = this.props;

    return <CommonPageLayout activeMenu="home">

      <Segment style={{ padding: '4em 0em' }} vertical>
        <Container>
          <Header as="h1">Above Under Photo Map</Header>

          <div style={{ width: "100%", height: 800 }}>
            <PrintsMap
              prints={prints}
              initialPrintId={selectedPrintId}
              selectedPrintChanged={this.selectedPrintChanged}
            />
          </div>

        </Container>
      </Segment>

    </CommonPageLayout>
  }

  selectedPrintChanged = (print?: IPrint) => {
    if (print)
      this.props.history.push(`/map/${print.id}`);
    else
      this.props.history.push("/map");
  }

}
