import { LambdaEvent, LambdaCallback, LambdaCallResult } from "./types";
import * as https from "https";
import { RequestOptions } from "https";

export type PrintfulAPIItemInfo = {
  variant_id: string;
  quantity: number;
  value: string;
};

export type ProductJsonImport = {
  id: string;
  price: number;
  urls: string;
  meta?: any;
}[];

export type CalculateShippingEventBody = {
  content: {
    shippingAddressAddress1: string;
    shippingAddressCountry: string;
    shippingAddressCity: string;
    shippingAddressPostalCode: string;
    shippingAddressProvince: string;
    items: SnipcartItem[];
  };
};

export const freeShippingToPerthMessage = "Free shipping to Perth";
export const standardShippingMessage = "Standard shipping";
export const combinedShippingMessage = "Combined shipping";

export type SnipcartItem = {
  id: string;
  weight: number;
  price: number;
  url: string;
  quantity: number;
};

export type SnipcartRate = {
  cost: number;
  description: string;
};

export type PrintfulAddress = {
  address1: string;
  city: string;
  country_code: string;
  state_code: string;
  zip: number;
};

const exampleResponse = {
  rates: [
    {
      cost: 10,
      description: "10$ shipping"
    },
    {
      cost: 20,
      description: "20$ shipping",
      guaranteedDaysToDelivery: 5
    }
  ]
};

type SuccessResponse = typeof exampleResponse;

const exampleError = {
  errors: [
    {
      key: "invalid_postal_code",
      message: "The postal code is invalid."
    }
  ]
};

type ErrorResponse = typeof exampleError;

export type PrintfulAPIResult<T> = {
  code: number;
  result: T;
};

export type PrintfulAPIShippingEntry = {
  id: string;
  name: string;
  rate: string;
  currency: string;
};

export function handler(
  event: LambdaEvent,
  context: any,
  callback: LambdaCallback
) {
  console.log("Calculating shipping..", event);

  handle(callback, async () => {
    if (event.httpMethod != "POST") throw new Error("Event must be POST");

    if (!event.body) throw new Error("Event must contain a body");

    const body: CalculateShippingEventBody = JSON.parse(event.body);

    if (!body.content || !body.content.items)
      throw new Error("Improperly formatted body");

    if (body.content.items.length == 0)
      throw new Error("No items supplied in body");

    const items = body.content.items;

    // Prevent multiple printers in one order, this complicates things a little too
    // much right now
    guardAgainstMultiplePrinters(items);

    console.log("Calculating shipping..");

    const response: SuccessResponse = {
      rates: await calculateShipping(body)
    };

    return response;
  });
}

function guardAgainstMultiplePrinters(items: SnipcartItem[]) {
  var printer = getPrinter(items[0]);
  for (var i = 1; i < items.length; i++)
    if (getPrinter(items[i]) != printer)
      throw new Error("Cannot have multiple printers in one order");
}

function getPrinter(item: SnipcartItem): string {
  const idParts = item.id.split("-");
  const printer = idParts[idParts.length - 1];
  return printer;
}

function getPrintOption(item: SnipcartItem): string {
  const idParts = item.id.split("-");
  const printer = idParts[idParts.length - 3];
  return printer;
}

async function calculateShipping(
  body: CalculateShippingEventBody
): Promise<SnipcartRate[]> {
  const printer = getPrinter(body.content.items[0]);
  if (printer == "fitzgeralds")
    return await Promise.resolve([calculateFitzShipping(body)]);

  if (printer == "printful") return await calculatePrintfulShipping(body);

  throw new Error(`Unknown printer '${printer}'`);
}

function calculateFitzShipping(body: CalculateShippingEventBody): SnipcartRate {
  const country = body.content.shippingAddressCountry;
  const postalCode = body.content.shippingAddressPostalCode;
  const items = body.content.items;

  // If they are perth based then free shipping
  if (country == "AU" && postalCode.startsWith("6"))
    return {
      cost: 0,
      description: freeShippingToPerthMessage
    };

  // Use wegith as the method for calculating fitz shipping
  const totalCost = items.reduce(
    (prev, item) => prev + getFitzPriceFromWeight(item.weight),
    0
  );

  return {
    cost: totalCost,
    description:
      items.length == 1 ? standardShippingMessage : combinedShippingMessage
  };
}

export function getFitzPriceFromWeight(weight: number): number {
  if (weight < 500) return 0;

  if (weight < 1000) return 16.5;

  if (weight < 1500) return 25;

  if (weight < 2000) return 35;

  if (weight < 3000) return 45;

  if (weight < 4000) return 55;

  return 150;
}

async function calculatePrintfulShipping(
  body: CalculateShippingEventBody
): Promise<SnipcartRate[]> {
  guardAgaintCanvasShippingFromPrintfulToAU(body);

  const itemInfos = await getVariantIdsForItems(body.content.items);

  const address: PrintfulAddress = {
    address1: body.content.shippingAddressAddress1,
    city: body.content.shippingAddressCity,
    country_code: body.content.shippingAddressCountry,
    zip: parseInt(body.content.shippingAddressPostalCode),
    state_code: body.content.shippingAddressProvince
  };

  console.log(
    "Loaded product size info from json, getting shipping rates from printful",
    { itemInfos, address }
  );

  const printfulRates = await getShippingRatesFromPrintfulAPI(
    itemInfos,
    address
  );

  console.log("Loaded printful rates", printfulRates);

  return [
    getFirstMatchingRate(
      ["USPS_FIRST", "APC_PARCEL_CONFIRM", "APC_PARCEL_CONNECT", "STANDARD"],
      printfulRates
    )
  ];
}

function guardAgaintCanvasShippingFromPrintfulToAU(
  body: CalculateShippingEventBody
) {
  for (var item of body.content.items)
    if (getPrintOption(item) == "canvas")
      throw new Error(
        "Cannot ship canvas to Australia from the global printer due to Australian customs rules."
      );
}

function getVariantIdsForItems(
  items: SnipcartItem[]
): Promise<PrintfulAPIItemInfo[]> {
  return Promise.all(items.map(i => getPrintfulInfoForItem(i)));
}

async function getPrintfulInfoForItem(
  item: SnipcartItem
): Promise<PrintfulAPIItemInfo> {
  console.log("Loading item info from: ", item.url);

  const sizes = await fetchJson<ProductJsonImport>(item.url);

  if (!sizes)
    throw new Error(`Loading of product data at url failed '${item.url}'`);

  const size = sizes.find(s => s.id == item.id);

  if (!size)
    throw new Error(
      `Cannot find '${item.id}' in the products at the URL '${item.url}'`
    );

  if (!size.meta || !size.meta.printfulVariantId)
    throw new Error(
      `Could not find the 'printfulVariantId' in the size meta in the data at '${
        item.url
      }'`
    );

  return {
    variant_id: size.meta.printfulVariantId,
    quantity: item.quantity,
    value: item.price + ""
  };
}

function getFirstMatchingRate(
  printfulShippingOptionIds: string[],
  entries: PrintfulAPIShippingEntry[]
): SnipcartRate {
  for (var shippingOptionId of printfulShippingOptionIds) {
    const option = entries.find(r => r.id == shippingOptionId);
    if (option)
      return {
        description: option.name,
        cost: Math.round(parseFloat(option.rate))
      };
  }

  throw new Error("No valid shipping options found in printful rates.");
}

async function getShippingRatesFromPrintfulAPI(
  itemInfos: PrintfulAPIItemInfo[],
  address: PrintfulAddress
): Promise<PrintfulAPIShippingEntry[]> {
  var formData = {
    recipient: address,
    currency: "AUD",
    items: itemInfos
  };

  const requestOptions: RequestOptions = {
    hostname: "api.printful.com",
    port: 443,
    path: "/shipping/rates",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": JSON.stringify(formData).length,
      Authorization: "Basic ZHk4cWN2d24tZGE1eS1hcjlkOjJpMG0taGlweXpqM2dlZWV1"
    }
  };

  const result = await fetchJson<PrintfulAPIResult<PrintfulAPIShippingEntry[]>>(
    requestOptions,
    formData
  );
  if (result.code != 200)
    throw new Error("Printful API error: " + JSON.stringify(result));

  return result.result;
}

async function fetchJson<T>(options: RequestOptions | string, body?: any) {
  return new Promise<T>((resolve, reject) => {
    const request = https
      .request(options, resp => {
        let data = "";

        // A chunk of data has been recieved.
        resp.on("data", chunk => {
          data += chunk;
        });

        resp.on("end", () => {
          resolve(JSON.parse(data));
        });
      })
      .on("error", err => {
        reject(err);
      });

    if (body) {
      const data = JSON.stringify(body);
      request.write(data);
    }

    request.end();
  });
}

async function handle(callback: LambdaCallback, fn: () => Promise<any>) {
  try {
    const resp: LambdaCallResult = {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(await fn())
    };

    console.log("Sending response", resp);
    callback(null, resp);
  } catch (e) {
    console.error("Error duing handle invokation.", e);

    const response: ErrorResponse = {
      errors: [
        {
          key: "exception",
          message: e + ""
        }
      ]
    };

    callback(null, {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(response)
    });
  }
}
