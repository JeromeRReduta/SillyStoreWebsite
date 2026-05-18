import { useMutation, UseMutationResult } from "@tanstack/react-query";
import frontendConfigs from "../../configs/FrontendConfigs";
import frontendLogger from "../../configs/frontendLogger";
import standardJsonFetch from "../../utils/services/StandardJsonFetch";
import { useCookies } from "react-cookie";
import { IOrderResponse } from "../../../SillyStoreCommon/dtos/orderDtos";

export default function useFinalizeOrder(): UseMutationResult<
    IOrderResponse,
    Error,
    null
> {
    const [{ token: jwt }, _setCookies, _removeCookies] = useCookies<
        "token",
        { token: string }
    >(["token"]);
    async function mutationFn(): Promise<IOrderResponse> {
        frontendLogger.debug("Updating pending order...");
        const bodyObj = { status: "complete" };
        const url = `${frontendConfigs.absolutePaths.external.api}/orders/pending`;
        const method = "PUT";
        const response: Response = await standardJsonFetch({
            bodyObj,
            jwt,
            url,
            method,
        });
        return (await response.json()) as IOrderResponse;
    }

    return useMutation({
        mutationFn,
    });
}
