import { IPrintOption } from "./types";

export const data : IPrintOption[] = [
    {
        name: "Photo Paper Poster",
        sizes: [
            {
                name: "14x12",
                widthInches: 14,
                heightInches: 12,
                priceAUD: 10
            },
            {
                name: "20x16",
                widthInches: 20,
                heightInches: 16,
                priceAUD: 20
            }
        ]
    },
    {
        name: "Framed Paper Poster",
        sizes: [
            {
                name: "18x12",
                widthInches: 18,
                heightInches: 12,
                priceAUD: 20
            },
            {
                name: "24x18",
                widthInches: 24,
                heightInches: 18,
                priceAUD: 40
            }
        ]
    }
]