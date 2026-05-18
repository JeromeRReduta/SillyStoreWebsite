import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { ICartItem } from "../../../SillyStoreCommon/domain-objects/CartItem";
import frontendConfigs from "../../configs/FrontendConfigs";
import frontendLogger from "../../configs/frontendLogger";
import standardJsonFetch from "../../utils/services/StandardJsonFetch";

export type OverwritePendingCartBody = Pick<
    ICartItem,
    "productId" | "quantity"
>[];

export default function useOverwritePendingCart(): UseMutationResult<
    void,
    Error,
    OverwritePendingCartBody
> {
    const [{ token: jwt }, _setCookies, _removeCookies] = useCookies<
        "token",
        { token: string }
    >(["token"]);

    async function mutationFn(cart: OverwritePendingCartBody): Promise<void> {
        const url = `${frontendConfigs.absolutePaths.external.api}/cart/pending`;
        const method = "PUT";
        frontendLogger.debug("Overwriting cart w/ dto: ", cart);
        const response: Response = await standardJsonFetch({
            bodyObj: cart,
            jwt,
            method,
            url,
        });
        frontendLogger.debug(
            "check - response code is",
            response.status,
            "(expected: 204)",
        );
    }

    return useMutation({
        mutationKey: [frontendConfigs.queryKeys.cart],
        mutationFn,
    });
}
