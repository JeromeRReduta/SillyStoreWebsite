import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { IProductResponse } from "../../../SillyStoreCommon/dtos/productDtos";
import frontendConfigs from "../../configs/FrontendConfigs";
import standardJsonFetch from "../../utils/services/StandardJsonFetch";

export default function useGetAllProducts(): UseQueryResult<
    IProductResponse[]
> {
    async function queryFn(): Promise<IProductResponse[]> {
        const url = `${frontendConfigs.absolutePaths.external.api}/products`;
        const response: Response = await standardJsonFetch({
            url,
        });
        return (await response.json()) as IProductResponse[];
    }

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
