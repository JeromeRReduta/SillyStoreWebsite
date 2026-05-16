import { useMutation, UseMutationResult } from "@tanstack/react-query";
import frontendConfigs from "../../src/configs/FrontendConfigs";
import { ICartItemResponse } from "../../SillyStoreCommon/dtos/cartItemDtos";
import wasteTime from "../utils/wasteTime";
import frontendLogger from "../../src/configs/frontendLogger";

export default function useMockOverwritePendingCart(): UseMutationResult<
    ICartItemResponse[],
    Error,
    ICartItemResponse[]
> {
    async function mutationFn(
        cart: ICartItemResponse[],
    ): Promise<ICartItemResponse[]> {
        frontendLogger.debug("Updating cart...");
        await wasteTime(3000);
        frontendLogger.debug("Cart updated!");
        frontendLogger.trace("Cart is now", cart);
        return cart;
    }

    return useMutation({
        mutationKey: [frontendConfigs.queryKeys.cart],
        mutationFn,
    });
}
