import { handler } from "./hello";
import { callFunction } from "./testUtils";

test('something', async () => 
{
    const result = await callFunction({},{}, handler);
    expect(result).toMatchSnapshot();
});