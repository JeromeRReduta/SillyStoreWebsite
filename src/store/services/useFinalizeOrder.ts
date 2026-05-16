import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { OrderStatus } from "../../../SillyStoreCommon/domain-objects/Order";
import frontendConfigs from "../../configs/FrontendConfigs";

export default function useFinalizeOrder(
    mutationFn: () => Promise<OrderStatus>,
): UseMutationResult<OrderStatus> {
    return useMutation({
        mutationKey: [frontendConfigs.queryKeys.cart],
        mutationFn,
    });
}
