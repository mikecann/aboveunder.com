import { handler } from "./hello";
import { LambdaCallResult, LambdaCallbackError, LambdaFunction, LambdaCallbackResult } from "./types";

async function callFunction(event:any, context:any, lambda: LambdaFunction) : Promise<LambdaCallbackResult>
{
    return new Promise<LambdaCallbackResult>(resolve => {
        lambda(event, context, (error?:LambdaCallbackError, result?:LambdaCallResult) => {
            resolve({ error, result })
        })
    });
}

test('something', async () => 
{
    const result = await callFunction({},{}, handler);
    expect(result).toMatchSnapshot();
});