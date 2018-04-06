import { LambdaEvent } from "./types";

type HTTPBody = {

}

export function handler(event:LambdaEvent<HTTPBody>, context:any, callback:any) {
    console.log("event", event);
    console.log("body", event.body)
    delete event.body;
    console.log("no body", event)
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({msg: "Calculated!!"})
    })
  }