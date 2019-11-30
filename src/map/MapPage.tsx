import * as React from "react";
import { Segment, Container, Header } from "semantic-ui-react";
import { IPrint } from "../lib/types";
import { PrintsMap } from "./PrintsMap";
import { useHistory, useLocation, useParams } from "react-router";
import { CommonPageLayout } from "../components/CommonPageLayout";
import { useDb } from "../hooks/useDb";
import { LoadingPage } from "../loading/LoadingPage";

type Params = {
  print?: string;
};

export default function MapPage() {
  const [db] = useDb();
  const history = useHistory();
  const params = useParams<Params>();

  const [selectedPrintId, setSelectedPrintId] = React.useState(params.print);

  if (!db) return <LoadingPage />;

  const selectedPrintChanged = (print?: IPrint) => {
    setSelectedPrintId(print && print.id);
    if (print) history.push(`/map/${print.id}`);
    else history.push("/map");
  };

  const prints = db.prints;

  return (
    <CommonPageLayout activeMenu="home">
      <Segment style={{ padding: "2em 0em" }} vertical>
        <Container fluid>
          <div style={{ width: "100%", height: 800 }}>
            <PrintsMap
              prints={prints}
              initialPrintId={selectedPrintId}
              selectedPrintChanged={selectedPrintChanged}
            />
          </div>
        </Container>
      </Segment>
    </CommonPageLayout>
  );
}
