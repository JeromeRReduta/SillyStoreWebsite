import { UseQueryResult, useQuery } from "@tanstack/react-query";
import frontendConfigs from "../../configs/FrontendConfigs";
import { ICartItemResponse } from "../../../SillyStoreCommon/dtos/cartItemDtos";
import { TokenResponse } from "../../../SillyStoreCommon/dtos/userDtos";

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

// async function defaultQuery(): Promise<ICartItem[]> {
//     const [cookies, _setCookies, _removeCookies] = useCookies<
//         "token",
//         { token: TokenResponse }
//     >(["token"]);

//     const orderId: number = 5;
//     const url: string = `${frontendConfigs.absolutePaths.external.api}/orders/${orderId}/cart`;
//     const requestInit: IFetchInfo = {
//         headers: { "Content-Type": "application/json" },
//     };
//     if (cookies.token) {
//         requestInit.headers.Authorization = `Bearer ${cookies.token}`;
//     }
//     const response: Response = await fetch(url, requestInit);

//     if (!response.ok) {
//         throw new Error("Something went wrong!");
//     }
//     if (response.status === 204) {
//         return [];
//     }
//     return (await response.json()) as ICartItem[];
// }
