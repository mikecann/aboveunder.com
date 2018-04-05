"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function handler(event, context, callback) {
    console.log(event);
    callback(null, {
        statusCode: 200,
        body: JSON.stringify({ msg: "Hello, World!!" })
    });
}
exports.handler = handler;
