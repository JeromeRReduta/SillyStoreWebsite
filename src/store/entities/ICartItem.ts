import type { IProductResponse } from "../../../SillyStoreCommon/dtos/responses/IProductResponse";

export interface ICartItem extends IProductResponse {
    quantity: number;
}
