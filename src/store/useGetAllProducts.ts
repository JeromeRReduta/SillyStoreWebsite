import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import queryKeys from "../utils/queryKeys";
import type { IProductResponse } from "../../SillyStoreCommon/dtos/responses/IProductResponse";
import frontendConfigs from "../configs/FrontendConfigs";
import frontendLogger from "../configs/FrontendLogger";

export default function useGetAllProducts(): UseQueryResult<
    IProductResponse[],
    Error
> {
    return useQuery({
        queryKey: [frontendConfigs.queryKeys.allProducts],
        queryFn: mockProducts,
    });
}

async function mockProducts(): Promise<IProductResponse[]> {
    return await Array.from(
        {
            length: 10,
        },
        (_: unknown, i: number) => generateProduct(i + 1),
    );
}

function generateProduct(i: number): IProductResponse {
    return {
        id: i,
        imageSrc: "image " + i,
        title: "title " + i,
        description: i.toString(),
        price: i * 1.11,
    };
}
