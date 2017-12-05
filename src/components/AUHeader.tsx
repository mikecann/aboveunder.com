import * as React from "react";

import Link from 'next/link'
import Head from 'next/head'
import { IProduct } from "../lib/types";

interface IProps {
}

export class AUHeader extends React.Component<IProps, any> {

  render() {
    return <header>
      <div>Above Under</div>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/shop">Shop</a></li>
      </ul>
    </header>
  }
}