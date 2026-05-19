import {
    useMutation,
    UseMutationResult,
    useQueryClient,
} from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { IOrderResponse } from "../../../SillyStoreCommon/dtos/orderDtos";
import frontendConfigs from "../../configs/FrontendConfigs";
import standardJsonFetch from "../../utils/services/StandardJsonFetch";
import { OrderStatus } from "../../../SillyStoreCommon/domain-objects/Order";

export default function useFinalizeOrder(): UseMutationResult<
    IOrderResponse,
    Error,
    null
> {
    const queryClient = useQueryClient();
    const [{ token: jwt }, _setCookies, _removeCookies] = useCookies<
        "token",
        { token: string }
    >(["token"]);
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
