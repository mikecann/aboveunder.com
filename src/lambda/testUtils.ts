import { LambdaFunction, LambdaCallbackResult, LambdaCallResult, LambdaCallbackError } from "./types";

export async function callFunction(event:any, context:any, lambda: LambdaFunction) : Promise<LambdaCallbackResult>
{
    return new Promise<LambdaCallbackResult>(resolve => {
        lambda(event, context, (error?:LambdaCallbackError, result?:LambdaCallResult) => {
            const callbackResult : LambdaCallbackResult = { error: error || null, result: result || null };
            resolve(callbackResult);
        })
    });
}