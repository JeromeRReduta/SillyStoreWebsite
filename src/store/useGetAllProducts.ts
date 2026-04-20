import { useQuery } from "@tanstack/react-query";
import queryKeys from "../utils/queryKeys";
import { configs } from "eslint-plugin-import-x";

export default function useGetAllProducts() {
    return useQuery({
        queryKey: [queryKeys.products],
        queryFn: async function (): Promise<ProductData[]> {
            const url: string = `${configs.apiUrl}/products`;
            const response: Response = await fetch(url, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const isJson: boolean = /json/.test(
                response.headers.get("Content-Type") ?? "",
            );
            const result: ProductData[] | undefined = isJson
                ? await response.json()
                : undefined;
            if (!isJson) {
                throw new Error(result?.toString() ?? "Something went wrong");
            }
            if (!response.ok) {
                throw new Error(result?.toString() ?? "Something went wrong");
            }
            return result;
        },
    });
}
