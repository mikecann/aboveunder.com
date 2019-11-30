import * as React from "react";
import * as ReactDOM from "react-dom";
import App, { HotApp } from "./App";

async function init() {
  ReactDOM.render(<HotApp />, document.getElementById("root"));
}

init();
