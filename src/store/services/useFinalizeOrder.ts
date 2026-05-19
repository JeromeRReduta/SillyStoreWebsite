import {
    useMutation,
    UseMutationResult,
    useQueryClient,
} from "@tanstack/react-query";
import { OrderStatus } from "../../../SillyStoreCommon/domain-objects/Order";
import { IOrderResponse } from "../../../SillyStoreCommon/dtos/orderDtos";
import frontendConfigs from "../../configs/FrontendConfigs";
import standardJsonFetch from "../../utils/services/StandardJsonFetch";
import useWebsiteCookies from "../../utils/services/useWebsiteCookies";

export default function useFinalizeOrder(): UseMutationResult<
    IOrderResponse,
    Error,
    null
> {
    const queryClient = useQueryClient();
    const [{ local_token: jwt }, _setCookies, _removeCookies] =
        useWebsiteCookies();
    async function mutationFn(): Promise<IOrderResponse> {
        const bodyObj: { status: OrderStatus } = { status: "completed" };
        const url = `${frontendConfigs.absolutePaths.external.api}/orders/pending`;
        const method = "PUT";
        const response: IOrderResponse = await standardJsonFetch({
            bodyObj,
            jwt,
            url,
            method,
        });
        queryClient.removeQueries({
            queryKey: [frontendConfigs.queryKeys.cart],
            exact: true,
        });
        return response;
    }

    return useMutation({
        mutationFn,
    });
}
