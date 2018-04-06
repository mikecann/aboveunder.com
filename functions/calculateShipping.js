export function handler(event, context, callback) {
    console.log("Calculating shipping", { event: event, context: context });
    callback(null, {
        statusCode: 200,
        body: JSON.stringify({ msg: "Calculated!!" })
    });
}
