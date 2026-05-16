import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { ICartItemResponse } from "../../../SillyStoreCommon/dtos/cartItemDtos";
import frontendConfigs from "../../configs/FrontendConfigs";

export interface IFetchInfo extends ResponseInit {
    readonly headers: Record<string, string>;
}

export default function useGetPendingCart(
    queryFn: () => Promise<ICartItemResponse[]>,
): UseQueryResult<ICartItemResponse[]> {
    return useQuery({
        queryKey: [frontendConfigs.queryKeys.cart],
        queryFn,
    });
}
