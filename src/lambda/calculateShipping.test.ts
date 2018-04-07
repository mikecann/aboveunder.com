import { handler, CalculateShippingEventBody, SnipcartItem, SnipcartRate, freeShippingToPerthMessage, standardShippingMessage, getFitzPriceFromWeight, getPrintfulPriceFromWeight } from "./calculateShipping";
import { callFunction } from "./testUtils";
import { LambdaEvent } from "./types";

function getEvent(body:Partial<CalculateShippingEventBody>) : LambdaEvent {
  const event : LambdaEvent = {
    httpMethod: "POST",
    body: JSON.stringify(body),
    headers: {},
    queryStringParameters: ""
  }

  return event;
}

async function testLambda(body:Partial<CalculateShippingEventBody>, expectedRates: SnipcartRate[]) {
  const event = getEvent(body);
  const result = await callFunction(event, {}, handler);
  expect(result.result.body).toMatch(JSON.stringify({ rates: expectedRates }))
}

// test('no event returns error', async () => 
// {
//     const result = await callFunction({},{}, handler);
//     expect(result).toMatchSnapshot();
// });

// test('GET event returns error', async () => 
// {
//     const event : LambdaEvent = {
//       httpMethod: "GET",
//       body: "",
//       headers: {},
//       queryStringParameters: ""
//     }
//     const result = await callFunction(event,{}, handler);
//     expect(result).toMatchSnapshot();
// });

// test('free shipping to perth addresses with fitzgeralds', async () => 
// {
//   testLambda({
//     content: {
//       shippingAddressCountry: "AU",
//       shippingAddressPostalCode: "6151",
//       items: [{ id:"au0162-watermans-observatory-photo-paper-poster-12x8-fitzgeralds", price:0, weight: 3000 }]
//     }
//   }, 
//   [{
//     cost: 0, description: freeShippingToPerthMessage
//   }]);
// });

// test('non perth AU adresses have to pay with fitzgeralds', async () => 
// {
//   [100,1000,1300,1400,1700,2200,3300,4000,5500,8000,1231231]
//     .forEach(weight => {

//       testLambda({
//         content: {
//           shippingAddressCountry: "AU",
//           shippingAddressPostalCode: "3221",
//           items: [{ id:"au0162-watermans-observatory-photo-paper-poster-12x8-fitzgeralds", price:0, weight: weight }]
//         }
//       }, 
//       [{
//         cost: getFitzPriceFromWeight(weight), description: standardShippingMessage
//       }]);

//     })

// });

test('printful prices loaded dynamically', async () => 
{
  testLambda({
    content: {
      shippingAddressCountry: "AU",
      shippingAddressPostalCode: "3221",
      items: [{ 
        id:"au0162-watermans-observatory-photo-paper-poster-12x8-printful", 
        price:0, 
        weight: 44 ,
        url: "https://aboveunder.com/products/au0162-watermans-observatory.json"
      }]
    }
  }, 
  [{
    cost: 44, description: standardShippingMessage
  }]);

});