import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { IProductResponse } from "../../SillyStoreCommon/dtos/productDtos";
import frontendConfigs from "../../src/configs/FrontendConfigs";
import frontendLogger from "../../src/configs/frontendLogger";
import wasteTime from "../utils/wasteTime";

export default function useMockGetAllProducts(): UseQueryResult<
    IProductResponse[]
> {
    return useQuery({
        queryKey: [frontendConfigs.queryKeys.allProducts],
        queryFn: async function (): Promise<IProductResponse[]> {
            frontendLogger.debug("Getting products...");
            await wasteTime(3000);
            return mockProducts;
        },
    });
}

const NUM_MOCK_PRODUCTS = 10;
const mockProducts = Array.from(
    { length: NUM_MOCK_PRODUCTS },
    (_, i): IProductResponse => {
        const moneyStr: string = (i * 1.11).toFixed(2);
        return {
            id: i,
            imageSrc: "/placeholder.webp",
            title: "title " + i.toString(),
            description: i.toString(),
            price: +moneyStr,
        };
    },
);
