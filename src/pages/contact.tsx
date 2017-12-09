import * as React from "react";

import Head from 'next/head'
import { ContactPage } from "../components/ContactPage";
import { CommonLibs } from "../components/CommonLibs";
import { CommonPageLayout } from "../components/CommonPageLayout";

interface IProps
{
}

export default class extends React.Component<IProps, any> {


  render () {
    return (
      <main>
        
        <Head>
          <title>Above Under - Contact</title>
          <CommonLibs />
        </Head>

        <CommonPageLayout activeMenu="contact">
          <ContactPage />
        </CommonPageLayout>

      </main>
    )
  }
}
