import * as React from "react";

import Head from 'next/head'
import { HeaderMenu } from "../components/HeaderMenu";
import { PageFooter } from "../components/PageFooter";
import { ContactPage } from "../components/ContactPage";

interface IProps
{
}

export default class extends React.Component<IProps, any> {


  render () {
    return (
      <main>
        
        <Head>
          <title>Above Under - Contact</title>
          <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
        </Head>

        <HeaderMenu menuProps={{ size:"huge" }} activeMenu="contact" />
        <ContactPage />
        <PageFooter />

      </main>
    )
  }
}
