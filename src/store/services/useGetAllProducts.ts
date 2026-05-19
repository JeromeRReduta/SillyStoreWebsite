import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { IProductResponse } from "../../../SillyStoreCommon/dtos/productDtos";
import frontendConfigs from "../../configs/FrontendConfigs";
import standardJsonFetch from "../../utils/services/StandardJsonFetch";

export default function useGetAllProducts(): UseQueryResult<
    IProductResponse[]
> {
    async function queryFn(): Promise<IProductResponse[]> {
        const url = `${frontendConfigs.absolutePaths.external.api}/products`;
        return await standardJsonFetch({
            url,
        });
    }

    return useQuery({
        queryKey: [frontendConfigs.queryKeys.allProducts],
        queryFn,
    });
}
