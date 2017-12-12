import * as React from "react";
import { PageFooter } from "../components/PageFooter";
import { HeaderMenu } from "../components/HeaderMenu";

interface IProps {
  activeMenu: string;
}

interface IState {
}

export class CommonPageLayout extends React.Component<IProps, IState> {

  render() {

    return <div style={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
      <HeaderMenu menuProps={{ size: "huge" }} activeMenu={this.props.activeMenu} />
      <div style={{ flex: 1 }}>
        {this.props.children}
      </div>
      <PageFooter />
    </div>
  }
}
