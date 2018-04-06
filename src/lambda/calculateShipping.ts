

export function handler(event:any, context:any, callback:any) {
    var str = JSON.stringify({event, context}, null, 2);
    console.log(str);
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({msg: "Calculated!!"})
    })
  }