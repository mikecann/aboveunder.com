import { handler, HTTPBody } from "./calculateShipping";
import { callFunction } from "./testUtils";
import { LambdaEvent } from "./types";

test('no event returns error', async () => 
{
    const result = await callFunction({},{}, handler);
    expect(result).toMatchSnapshot();
});

test('GET event returns error', async () => 
{
    const event : LambdaEvent = {
      httpMethod: "GET",
      body: "",
      headers: {},
      queryStringParameters: ""
    }
    const result = await callFunction(event,{}, handler);
    expect(result).toMatchSnapshot();
});

test('it returns the correct response', async () => 
{
    const event : LambdaEvent = {
      httpMethod: "POST",
      body: JSON.stringify({
        content: {
          items: [{
            
          }]
        }
      }),
      headers: {},
      queryStringParameters: ""
    }

    const result = await callFunction(event, {}, handler);
    expect(result.result.body).toMatch(JSON.stringify({
      rates: [
        { cost: 33, description: "33 bucks shipping" }
      ]
    }))
});

