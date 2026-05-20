import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { ICartItemResponse } from "../../../SillyStoreCommon/dtos/cartItemDtos";
import frontendConfigs from "../../configs/FrontendConfigs";
import frontendLogger from "../../configs/frontendLogger";
import standardJsonFetch from "../../utils/services/StandardJsonFetch";
import useWebsiteCookies from "../../utils/services/useWebsiteCookies";

export interface IFetchInfo extends ResponseInit {
    readonly headers: Record<string, string>;
}

export default function useGetPendingCart(): UseQueryResult<
    ICartItemResponse[]
> {
    const [{ local_token: jwt }, _setCookie, _removeCookie] =
        useWebsiteCookies();
    const url = `${frontendConfigs.absolutePaths.external.api}/cart/pending`;

    async function queryFn(): Promise<ICartItemResponse[]> {
        frontendLogger.info("cookies: ", jwt);
        frontendLogger.debug("Getting cart items...");
        return await standardJsonFetch({
            url,
            jwt,
        });
    }
    return useQuery({
        queryKey: [frontendConfigs.queryKeys.cart],
        queryFn,
    });
}
