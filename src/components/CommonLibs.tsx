import * as React from "react";


const key = process.env.SNIPCART_KEY || "NDYwN2FhNmUtNzZmNy00Y2I4LTkyODUtMDMyOGNhMDIzZTFjNjM2NDc5ODczMzIxNTUyOTU5";

export const CommonLibs = () => <React.Fragment>
        <script async src='/scripts/jquery.min.js' />
        <script async src='/scripts/snipcart.js' data-api-key={key} id="snipcart" />
        <link rel='stylesheet' href='https://cdn.snipcart.com/themes/2.0/base/snipcart.min.css' />
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
    </React.Fragment>