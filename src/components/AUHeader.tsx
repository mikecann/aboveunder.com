import * as React from "react";

interface IProps {
}

export class AUHeader extends React.Component<IProps, any> {

  render() {
    return <header>
      <div>Above Under</div>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/shop">Shop</a></li>
        <li><a href="/blog">Blog</a></li>
      </ul>
    </header>
  }
}