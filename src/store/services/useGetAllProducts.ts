import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import queryKeys from "../utils/queryKeys";
import type { IProductResponse } from "../../SillyStoreCommon/dtos/responses/IProductResponse";
import frontendConfigs from "../configs/FrontendConfigs";
import frontendLogger from "../configs/FrontendLogger";

export default function useGetAllProducts(
    queryFn: () => Promise<IProductResponse[]> = defaultQuery,
): UseQueryResult<IProductResponse[], Error> {
    return useQuery({
        queryKey: [frontendConfigs.queryKeys.allProducts],
        queryFn,
    });
}

async function defaultQuery(): Promise<IProductResponse[]> {
    const url: string = `${frontendConfigs.absolutePaths.external.api}/products`;
    const response: Response = await fetch(url);
    if (!response.ok) {
        throw new Error("Something went wrong!");
    }
    if (response.status === 204) {
        return [];
    }
    return (await response.json()) as IProductResponse[];
}
