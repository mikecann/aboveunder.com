import * as React from "react";
import { Vertical } from "gls/lib";
import { Loader } from "semantic-ui-react";

interface Props
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export function SuspenseFallback({}: Props) {
  return (
    <Vertical
      verticalAlign="center"
      horizontalAlign="center"
      style={{ height: "100vh", width: "100%", color: "#f0f2f5" }}
    >
      <Loader />
    </Vertical>
  );
}
