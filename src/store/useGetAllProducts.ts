import useStandardQuery from "../utils/UseStandardQuery";
import frontendConfigs from "../configs/FrontendConfigs";
import type { IRequestFnAsync } from "../utils/IRequestFnAsync";
import type { IProductResponse } from "../../SillyStoreCommon/dtos/responses/IProductResponse";

export default function useGetAllProducts(
    requestFnAsync: IRequestFnAsync<IProductResponse> = defaultFnAsync,
) {
    return useStandardQuery({
        queryKeys: [frontendConfigs.queryKeys.products],
        requestFnAsync,
    });
}

const defaultFnAsync: IRequestFnAsync<IProductResponse> = async () => {
    return { isError: true, body: new Error("default") };
};
