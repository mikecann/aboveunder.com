import * as React from "react";
import Head from 'next/head'
import { getPrint, getFirstPrint } from "../lib/db"
import { IPrint } from "../lib/types";
import { PrintPage } from "../components/PrintPage";
import { CommonPageLayout } from "../components/CommonPageLayout";
import { CommonLibs } from "../components/CommonLibs";
import * as Route from "route-parser";

interface IServerProps {
  query: {
    id: string,
    option?: string,
    size?: string
  }
}

interface IProps {
  print: IPrint,
  option?:string,
  size?:string,
  url: {
    asPath: string;
  }
}

export default class extends React.Component<IProps, any> {

  static async getInitialProps(props: IServerProps) {
    const query = props.query;
    console.log("getInitialProps", props);
    const print = query.id ? await getPrint(query.id) : await getFirstPrint();
    return { print, option:query.option, size:query.size }
  }

  componentDidMount()
  {
    var route = new Route(window.location.href);
    route.
    console.log("print page constructed", {props:this.props, route});
  }

  componentWillReceiveProps(nextProps:IProps) {
    console.log("got next props", nextProps);
  }

  render() {

    const { print, url, option, size } = this.props;
    return (
      <main>

        <Head>
          <title>Above Under - {print.title}</title>
          <CommonLibs />
        </Head>

        <CommonPageLayout activeMenu="shop">
          <PrintPage print={print} url={url.asPath} 
            initialPrintOption={option} initialPrintSize={size} />
        </CommonPageLayout>

      </main>
    )
  }
}

