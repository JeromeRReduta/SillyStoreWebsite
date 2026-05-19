import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { ICartItemResponse } from "../../../SillyStoreCommon/dtos/cartItemDtos";
import frontendConfigs from "../../configs/FrontendConfigs";
import { useCookies } from "react-cookie";
import frontendLogger from "../../configs/frontendLogger";
import standardJsonFetch from "../../utils/services/StandardJsonFetch";

export interface IFetchInfo extends ResponseInit {
    readonly headers: Record<string, string>;
}

export default function useGetPendingCart(): UseQueryResult<
    ICartItemResponse[]
> {
    const [cookies, _setCookies, _removeCookies] = useCookies<
        "token",
        { token: string }
    >(["token"]);
    const url = `${frontendConfigs.absolutePaths.external.api}/cart/pending`;

    async function queryFn(): Promise<ICartItemResponse[]> {
        frontendLogger.debug("Getting cart items...");
        return await standardJsonFetch({
            url,
            jwt: cookies.token,
        });
    }
    return useQuery({
        queryKey: [frontendConfigs.queryKeys.cart],
        queryFn,
    });
}
