import { LambdaCallback } from "./types";

export function handler(event:any, context:any, callback:LambdaCallback) {
    console.log(event)
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({msg: "Hello, World!"})
    })
  }