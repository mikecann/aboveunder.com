

export function handler(event:any, context:any, callback:any) {
    console.log(event);
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({msg: "Calculated!!"})
    })
  }