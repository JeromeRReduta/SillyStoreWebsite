import {
    useMutation,
    UseMutationResult,
    useQueryClient,
} from "@tanstack/react-query";
import { ICartItem } from "../../../SillyStoreCommon/domain-objects/CartItem";
import frontendConfigs from "../../configs/FrontendConfigs";
import frontendLogger from "../../configs/frontendLogger";
import standardJsonFetch from "../../utils/services/StandardJsonFetch";
import useWebsiteCookies from "../../utils/services/useWebsiteCookies";

export interface OverwritePendingCartBody {
    cartItems: Pick<ICartItem, "productId" | "quantity">[];
}

export default function useOverwritePendingCart(): UseMutationResult<
    void,
    Error,
    OverwritePendingCartBody
> {
    const [{ local_token: jwt }, _setCookies, _removeCookies] =
        useWebsiteCookies();

    const queryClient = useQueryClient();

    async function mutationFn(cart: OverwritePendingCartBody): Promise<void> {
        const url = `${frontendConfigs.absolutePaths.external.api}/cart/pending`;
        const method = "PUT";
        frontendLogger.debug("Overwriting cart w/ dto: ", cart);
        await standardJsonFetch({
            bodyObj: cart,
            jwt,
            method,
            url,
        });
        queryClient.removeQueries({
            queryKey: [frontendConfigs.queryKeys.cart],
            exact: true,
        });
    }

    return useMutation({
        mutationKey: [frontendConfigs.queryKeys.cart],
        mutationFn,
    });
}
