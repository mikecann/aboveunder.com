import { LambdaEvent, LambdaCallback, LambdaCallResult } from "./types";

const exampleBody = {
  "eventName": "shippingrates.fetch",
  "mode": "Live",
  "createdOn": "2018-04-06T07:26:32.7493853Z",
  "content": {
    "token": "e8c340d6-4d7b-4b75-ae2d-bc0e283df8bc",
    "isRecurringOrder": false,
    "parentToken": null,
    "parentInvoiceNumber": null,
    "subscriptionId": null,
    "currency": "aud",
    "creationDate": "2018-04-06T03:02:50Z",
    "modificationDate": "2018-04-06T03:02:51Z",
    "recoveredFromCampaignId": null,
    "status": "InProgress",
    "paymentStatus": null,
    "email": "mike.cann@gmail.com",
    "willBePaidLater": false,
    "billingAddressFirstName": null,
    "billingAddressName": "Mike",
    "billingAddressCompanyName": "",
    "billingAddressAddress1": "3 / 25 Hardy Street",
    "billingAddressAddress2": "",
    "billingAddressCity": "South Perth",
    "billingAddressCountry": "AU",
    "billingAddressProvince": "",
    "billingAddressPostalCode": "6151",
    "billingAddressPhone": "",
    "billingAddress": {
      "fullName": "Mike",
      "firstName": null,
      "name": "Mike",
      "company": "",
      "address1": "3 / 25 Hardy Street",
      "address2": "",
      "fullAddress": "3 / 25 Hardy Street",
      "city": "South Perth",
      "country": "AU",
      "postalCode": "6151",
      "province": "",
      "phone": "",
      "vatNumber": null
    },
    "shippingAddressFirstName": null,
    "shippingAddressName": "Mike",
    "shippingAddressCompanyName": "",
    "shippingAddressAddress1": "3 / 25 Hardy Street",
    "shippingAddressAddress2": "",
    "shippingAddressCity": "South Perth",
    "shippingAddressCountry": "AU",
    "shippingAddressProvince": "",
    "shippingAddressPostalCode": "6151",
    "shippingAddressPhone": "",
    "shippingAddress": {
      "fullName": "Mike",
      "firstName": null,
      "name": "Mike",
      "company": "",
      "address1": "3 / 25 Hardy Street",
      "address2": "",
      "fullAddress": "3 / 25 Hardy Street",
      "city": "South Perth",
      "country": "AU",
      "postalCode": "6151",
      "province": "",
      "phone": "",
      "vatNumber": null
    },
    "shippingAddressSameAsBilling": false,
    "creditCardLast4Digits": null,
    "trackingNumber": null,
    "trackingUrl": null,
    "shippingFees": null,
    "shippingProvider": null,
    "shippingMethod": null,
    "cardHolderName": null,
    "paymentMethod": 0,
    "notes": null,
    "customFieldsJson": "[]",
    "userId": "064c296c-5e74-40dd-9338-e40b763e96de",
    "completionDate": null,
    "paymentGatewayUsed": "None",
    "taxProvider": "Default",
    "discounts": [],
    "plans": [],
    "taxes": [],
    "user": null,
    "items": [
      {
        "paymentSchedule": {
          "interval": 0,
          "intervalCount": 1,
          "trialPeriodInDays": null,
          "startsOn": "2018-04-06T00:00:00Z"
        },
        "token": "e8c340d6-4d7b-4b75-ae2d-bc0e283df8bc",
        "name": "Watermans Observatory",
        "price": 22,
        "quantity": 1,
        "fileGuid": null,
        "url": "https://aboveunder.com/products/au0162-watermans-observatory.json",
        "id": "au0162-watermans-observatory-photo-paper-poster-12x8-fitzgeralds",
        "initialData": "",
        "description": `'Watermans Observatory' printed on 'Photo Paper Poster' at size '12" x 8"' using '🐨 Australian Printer'`,
        "categories": [],
        "weight": 500,
        "image": "/images/products/thumb/Watermans-Observatory.jpg",
        "originalPrice": null,
        "uniqueId": "26e4c45a-56ce-4498-8734-ca49339dd018",
        "stackable": true,
        "minQuantity": null,
        "maxQuantity": null,
        "addedOn": "2018-04-06T03:02:51Z",
        "modificationDate": "2018-04-06T03:02:51Z",
        "shippable": true,
        "taxable": true,
        "duplicatable": false,
        "width": null,
        "height": null,
        "length": null,
        "metadata": null,
        "totalPrice": 22,
        "totalWeight": 500,
        "taxes": [],
        "alternatePrices": {},
        "customFields": [
          {
            "name": "Note to Above Under",
            "displayValue": "",
            "operation": null,
            "type": "textarea",
            "options": "",
            "required": false,
            "value": "",
            "optionsArray": null
          }
        ],
        "unitPrice": 22,
        "hasDimensions": false
      }
    ],
    "refunds": [],
    "lang": "en",
    "refundsAmount": 0,
    "adjustedAmount": 22,
    "finalGrandTotal": 22,
    "totalNumberOfItems": 0,
    "invoiceNumber": "e8c340d6-4d7b-4b75-ae2d-bc0e283df8bc",
    "billingAddressComplete": true,
    "shippingAddressComplete": true,
    "shippingMethodComplete": false,
    "rebateAmount": 0,
    "subtotal": 22,
    "baseTotal": 22,
    "itemsTotal": 22,
    "taxableTotal": 22,
    "grandTotal": 22,
    "total": 22,
    "totalWeight": 500,
    "totalRebateRate": 0,
    "customFields": [],
    "shippingEnabled": true,
    "numberOfItemsInOrder": 1,
    "paymentTransactionId": "",
    "metadata": {},
    "taxesTotal": 0,
    "itemsCount": 1,
    "summary": {
      "subtotal": 22,
      "taxableTotal": 22,
      "total": 22,
      "payableNow": 22,
      "paymentMethod": 0,
      "taxes": [],
      "adjustedTotal": 22,
      "shipping": null
    },
    "ipAddress": "61.245.143.206",
    "hasSubscriptions": false
  }
}

export type HTTPBody = typeof exampleBody;

const exampleResponse = {
  "rates": [{
    "cost": 10,
    "description": "10$ shipping"
  }, {
    "cost": 20,
    "description": "20$ shipping",
    "guaranteedDaysToDelivery": 5
  },
  ]
}

type SuccessResponse = typeof exampleResponse;

const exampleError = {
  "errors": [{
    "key": "invalid_postal_code",
    "message": "The postal code is invalid."
    },
  ]
};

type ErrorResponse = typeof exampleError;

export function handler(event: LambdaEvent, context: any, callback: LambdaCallback) {

  handle(callback, () => {

    if (event.httpMethod != "POST")
      throw new Error("Event must be POST");
    
    if (!event.body)
      throw new Error("Event must contain a body");

    const body: HTTPBody = JSON.parse(event.body); 

    if (!body.content || !body.content.items || body.content.items.length == 0)
      throw new Error("Improperly formatted body");

    const items = body.content.items;
    console.log("Calculating shipping..", { items });

    const response: SuccessResponse = {
      rates: [
        { cost: 33, description: "33 bucks shipping" }
      ]
    }

    return response;
  })

}

async function handle(callback: LambdaCallback, fn: () => any) {
  try {
    const resp : LambdaCallResult = {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(fn())
    };
    
    console.log("Sending response", resp);
    callback(null, resp);
  }
  catch (e) {
    const response : ErrorResponse = {
      errors: [{
        key: "exception",
        message: e+""
      }]
    };

    callback(null, {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(response)
    })
  }
}