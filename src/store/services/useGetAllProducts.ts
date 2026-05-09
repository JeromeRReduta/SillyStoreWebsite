import { type UseQueryResult, useQuery } from "@tanstack/react-query";
import type { IProductResponse } from "../../../SillyStoreCommon/dtos/responses/IProductResponse";
import frontendConfigs from "../../configs/FrontendConfigs";

export default function useGetAllProducts(
    queryFn: () => Promise<IProductResponse[]>,
): UseQueryResult<IProductResponse[]> {
    return useQuery({
        queryKey: [frontendConfigs.queryKeys.allProducts],
        queryFn,
    });
}

// async function defaultQuery(): Promise<IProductResponse[]> {
//     const url: string = `${frontendConfigs.absolutePaths.external.api}/products`;
//     const response: Response = await fetch(url);
//     if (!response.ok) {
//         throw new Error("Something went wrong!");
//     }
//     if (response.status === 204) {
//         return [];
//     }
//     return (await response.json()) as IProductResponse[];
// }
