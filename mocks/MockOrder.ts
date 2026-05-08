import type { IOrderResponse } from "../../SillyStoreCommon/dtos/responses/IOrderResponse";

export default function mockOrder(i: number): IOrderResponse {
    return {
        id: i,
        dateStr: `2001-${i}-10`,
        userId: 0,
    };
}
