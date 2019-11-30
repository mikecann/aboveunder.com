import * as React from "react";
import { Loader } from "semantic-ui-react";
import { Vertical } from "gls/lib";

export function LoadingPage() {
  return (
    <Vertical style={{ minHeight: "100vh" }} horizontalAlign="center" verticalAlign="center">
      <Loader size="huge" active inline />
    </Vertical>
  );
}
