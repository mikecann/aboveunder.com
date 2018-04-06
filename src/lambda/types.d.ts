
export type LambdaCallbackError = string | {} | null;
export type LambdaCallResult = {
    statusCode: number,
    body: string
}

export type LambdaCallbackWithError = (error:LambdaCallbackError) => void;
export type LambdaCallbackWithResult = (error:null, result:LambdaCallResult) => void;
//export type LambdaCallback = LambdaCallbackWithError | LambdaCallbackWithResult;

export type LambdaCallback = (error?:LambdaCallbackError, result?:LambdaCallResult) => void;

export type LambdaCallbackResult = { error: LambdaCallbackError | null, result: LambdaCallResult | null };

export type LambdaFunction = (event: any, context: any, callback: LambdaCallback) => void;