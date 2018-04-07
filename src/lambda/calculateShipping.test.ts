import { handler, CalculateShippingEventBody, SnipcartItem, SnipcartRate, freeShippingToPerthMessage, standardShippingMessage, getFitzPriceFromWeight, combinedShippingMessage } from "./calculateShipping";
import { callFunction } from "./testUtils";
import { LambdaEvent } from "./types";

function getEvent(body: Partial<CalculateShippingEventBody>): LambdaEvent {
  const event: LambdaEvent = {
    httpMethod: "POST",
    body: JSON.stringify(body),
    headers: {},
    queryStringParameters: ""
  }

  return event;
}

async function testLambda(body: Partial<CalculateShippingEventBody>, expectedRates: SnipcartRate[]) {
  const event = getEvent(body);
  const result = await callFunction(event, {}, handler);
  expect(result.result.body).toMatch(JSON.stringify({ rates: expectedRates }))
}

console.log = () => { }

test('no event returns error', async () => {
  const result = await callFunction({}, {}, handler);
  expect(result).toMatchSnapshot();
});

test('GET event returns error', async () => {
  const event: LambdaEvent = {
    httpMethod: "GET",
    body: "",
    headers: {},
    queryStringParameters: ""
  }
  const result = await callFunction(event, {}, handler);
  expect(result).toMatchSnapshot();
});

test('free shipping to perth addresses with fitzgeralds', async () => {
  testLambda({
    content: {
      shippingAddressCountry: "AU",
      shippingAddressPostalCode: "6151",
      shippingAddressAddress1: "3 / 25 Hardy Street",
      shippingAddressProvince: "WA",
      shippingAddressCity: "South Perth",
      items: [{
        id: "au0162-watermans-observatory-photo-paper-poster-12x8-fitzgeralds",
        price: 0,
        url: "https://aboveunder.com/products/au0162-watermans-observatory.json",
        quantity: 1,
        weight: 3000
      }]
    }
  },
    [{
      cost: 0, description: freeShippingToPerthMessage
    }]);
});

test('non perth AU adresses have to pay with fitzgeralds', async () => {
  [100, 1000, 1300, 1400, 1700, 2200, 3300, 4000, 5500, 8000, 1231231]
    .forEach(weight => {

      testLambda({
        content: {
          shippingAddressCountry: "AU",
          shippingAddressPostalCode: "8000",
          shippingAddressAddress1: "",
          shippingAddressProvince: "WA",
          shippingAddressCity: "",
          items: [{
            id: "au0162-watermans-observatory-photo-paper-poster-12x8-fitzgeralds",
            price: 0,
            url: "https://aboveunder.com/products/au0162-watermans-observatory.json",
            quantity: 1,
            weight
          }]
        }
      },
        [{
          cost: getFitzPriceFromWeight(weight), description: standardShippingMessage
        }]);

    })
});

test('multiple printers in a single order is not allowed', async () => {
  const event = getEvent({
    content: {
      shippingAddressCountry: "AU",
      shippingAddressPostalCode: "8000",
      shippingAddressAddress1: "",
      shippingAddressProvince: "WA",
      shippingAddressCity: "",
      items: [{
        id: "au0162-watermans-observatory-photo-paper-poster-12x8-fitzgeralds",
        price: 10,
        url: "https://aboveunder.com/products/au0162-watermans-observatory.json",
        quantity: 1,
        weight: 1
      }, {
        id: "au0162-watermans-observatory-photo-paper-poster-10x10-printful",
        price: 10,
        url: "https://aboveunder.com/products/au0162-watermans-observatory.json",
        quantity: 1,
        weight: 1
      }]
    }
  });

  const result = await callFunction(event, {}, handler);
  expect(result.result.body).toContain("Cannot have multiple printers in one order");
});

test('multiple items are summed together when ordering from fitz', async () => {
  const event = getEvent({
    content: {
      shippingAddressCountry: "AU",
      shippingAddressPostalCode: "8000",
      shippingAddressAddress1: "",
      shippingAddressProvince: "WA",
      shippingAddressCity: "",
      items: [{
        id: "au0162-watermans-observatory-photo-paper-poster-12x8-fitzgeralds",
        price: 10,
        url: "https://aboveunder.com/products/au0162-watermans-observatory.json",
        quantity: 1,
        weight: 2000
      }, {
        id: "au0162-watermans-observatory-photo-paper-poster-12x8-fitzgeralds",
        price: 10,
        url: "https://aboveunder.com/products/au0162-watermans-observatory.json",
        quantity: 1,
        weight: 2000
      }]
    }
  });

  const result = await callFunction(event, {}, handler);
  expect(result.result.body).toMatch(JSON.stringify({
    rates: [
      { cost: 90, description: combinedShippingMessage }
    ]
  }))
});

test('printful prices loaded dynamically for AU customer', async () => {

  testLambda({
    content: {
      shippingAddressCountry: "AU",
      shippingAddressPostalCode: "6151",
      shippingAddressAddress1: "3 / 25 Hardy Street",
      shippingAddressProvince: "WA",
      shippingAddressCity: "South Perth",
      items: [{
        id: "au0162-watermans-observatory-photo-paper-poster-10x10-printful",
        price: 0,
        weight: 44,
        quantity: 1,
        url: "https://aboveunder.com/products/au0162-watermans-observatory.json"
      }]
    }
  },
    [{ "description": "Int\'l Economy with tracking (7-16 business days after fulfillment)", "cost": 9 }]);
})

test('printful prices loaded dynamically for US customer', async () => {

  testLambda({
    content: {
      shippingAddressCountry: "US",
      shippingAddressPostalCode: "89118",
      shippingAddressAddress1: "5235 Ponderosa Way",
      shippingAddressCity: "Las Vegas",
      shippingAddressProvince: "NV",
      items: [{
        id: "au0162-watermans-observatory-photo-paper-poster-10x10-printful",
        price: 0,
        weight: 44,
        quantity: 1,
        url: "https://aboveunder.com/products/au0162-watermans-observatory.json"
      }]
    }
  },
    [{ "description": "USPS First Class Mail (3-5 business days after fulfillment)", "cost": 4 }]);
})

test('multiple items sums order to US address', async () => {

  testLambda({
    content: {
      shippingAddressCountry: "US",
      shippingAddressPostalCode: "89118",
      shippingAddressAddress1: "5235 Ponderosa Way",
      shippingAddressCity: "Las Vegas",
      shippingAddressProvince: "NV",
      items: [{
        id: "au0162-watermans-observatory-photo-paper-poster-10x10-printful",
        price: 0,
        weight: 44,
        quantity: 1,
        url: "https://aboveunder.com/products/au0162-watermans-observatory.json"
      },
      {
        id: "au0162-watermans-observatory-photo-paper-framed-36x24-printful",
        price: 0,
        weight: 44,
        quantity: 1,
        url: "https://aboveunder.com/products/au0162-watermans-observatory.json"
      }]
    }
  },
    [{ "description": "Flat Rate (3-8 business days after fulfillment)", "cost": 49 }]);
})

test('illegal item to AU address', async () => {

  const event = getEvent({
    content: {
      shippingAddressCountry: "AU",
      shippingAddressPostalCode: "6151",
      shippingAddressAddress1: "3 / 25 Hardy Street",
      shippingAddressProvince: "WA",
      shippingAddressCity: "South Perth",
      items: [{
        id: "au0162-watermans-observatory-canvas-36x24-printful",
        price: 0,
        weight: 44,
        quantity: 1,
        url: "https://aboveunder.com/products/au0162-watermans-observatory.json"
      }]
    }
  });

  const result = await callFunction(event, {}, handler);
  expect(result.result.body).toContain("Error: Cannot ship canvas to the AU");
})

test('one illegal item to AU address', async () => {

  const event = getEvent({
    content: {
      shippingAddressCountry: "AU",
      shippingAddressPostalCode: "6151",
      shippingAddressAddress1: "3 / 25 Hardy Street",
      shippingAddressProvince: "WA",
      shippingAddressCity: "South Perth",
      items: [{
        id: "au0162-watermans-observatory-photo-paper-framed-36x24-printful",
        price: 0,
        weight: 44,
        quantity: 1,
        url: "https://aboveunder.com/products/au0162-watermans-observatory.json"
      },
      {
        id: "au0162-watermans-observatory-canvas-36x24-printful",
        price: 0,
        weight: 44,
        quantity: 1,
        url: "https://aboveunder.com/products/au0162-watermans-observatory.json"
      },]
    }
  });

  const result = await callFunction(event, {}, handler);
  expect(result.result.body).toContain("Error: Cannot ship canvas to the AU");
})

test('example0', async () => {
  testLambda(require("./examples/example0"),
    [{
      cost: 0, description: freeShippingToPerthMessage
    }]);
});

test('example1', async () => {
  testLambda(require("./examples/example1"),
    [{ "description": "Int\'l Economy with tracking (7-16 business days after fulfillment)", "cost": 85 }]);
});

test('example2', async () => {
  const event = getEvent(require("./examples/example2"));
  const result = await callFunction(event, {}, handler);
  expect(result.result.body).toContain("Error: Cannot ship canvas to the AU");
});