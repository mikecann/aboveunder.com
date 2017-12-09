import { IPrintOption } from "./types";

export const data : IPrintOption[] = [
    {
        id: "photo-paper-poster",
        name: "Photo Paper Poster",
        sizes: [
            {
                id: "14x12",
                widthInches: 14,
                heightInches: 12,
                priceAUD: 10
            },
            {
                id: "20x16",
                widthInches: 20,
                heightInches: 16,
                priceAUD: 20
            }
        ]
    },
    {
        id: "framed-paper-poster",
        name: "Framed Paper Poster",
        sizes: [
            {
                id: "18x12",
                widthInches: 18,
                heightInches: 12,
                priceAUD: 20
            },
            {
                id: "24x18",
                widthInches: 24,
                heightInches: 18,
                priceAUD: 40
            }
        ]
    }
]