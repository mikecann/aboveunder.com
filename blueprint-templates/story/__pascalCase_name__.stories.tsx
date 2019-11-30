import * as React from "react";
import { storiesOf } from "@storybook/react";
import { WorkingBoundsDecorator } from "./utils/WorkingBoundsDecorator";

storiesOf("{{pascalCase name}}", module)
  .addDecorator(fn => <WorkingBoundsDecorator style={ { width: 800, height: 600 } }>{fn()}</WorkingBoundsDecorator>)
  .add("default", () => <{{pascalCase name}} />)
