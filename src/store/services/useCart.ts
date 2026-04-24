import { useCookies } from "react-cookie";
import type { TokenResponse } from "../../../SillyStoreCommon/dtos/responses/TokenResponse";
import frontendConfigs from "../../configs/FrontendConfigs";
import type { ICartItem } from "../entities/ICartItem";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";

export interface IFetchInfo extends ResponseInit {
    readonly headers: Record<string, string>;
}

export default function useCart(
    queryFn: () => Promise<ICartItem[]> = defaultQuery,
): UseQueryResult<ICartItem[], Error> {
    return useQuery({
        queryKey: [frontendConfigs.queryKeys.cart],
        queryFn,
    });
}

async function defaultQuery(): Promise<ICartItem[]> {
    const [cookies, _setCookies, _removeCookies] = useCookies<
        "token",
        { token: TokenResponse }
    >(["token"]);

    const orderId: number = 5;
    const url: string = `${frontendConfigs.absolutePaths.external.api}/orders/${orderId}/cart`;
    const requestInit: IFetchInfo = {
        headers: { "Content-Type": "application/json" },
    };
    if (cookies.token) {
        requestInit.headers.Authorization = `Bearer ${cookies.token}`;
    }
    const response: Response = await fetch(url, requestInit);

    if (!response.ok) {
        throw new Error("Something went wrong!");
    }
    if (response.status === 204) {
        return [];
    }
    return (await response.json()) as ICartItem[];
}
