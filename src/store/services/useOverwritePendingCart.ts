import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { ICartItem } from "../../../SillyStoreCommon/domain-objects/CartItem";
import { OrderStatus } from "../../../SillyStoreCommon/domain-objects/Order";
import frontendConfigs from "../../configs/FrontendConfigs";

export type OverwritePendingCartBody = Pick<
    ICartItem,
    "productId" | "quantity"
>[];

export default function useOverwritePendingCart(
    mutationFn: (body: OverwritePendingCartBody) => Promise<void>,
): UseMutationResult<void, Error, OverwritePendingCartBody> {
    return useMutation({
        mutationKey: [frontendConfigs.queryKeys.cart],
        mutationFn,
    });
}
