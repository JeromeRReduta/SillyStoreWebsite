import type { IProductResponse } from "../../SillyStoreCommon/dtos/responses/IProductResponse";

export default function mockProduct(i: number): IProductResponse {
    return {
        id: i,
        imageSrc: "/placeholder.webp",
        title: "title " + i,
        description: i.toString(),
        price: i * 1.11,
    };
}
