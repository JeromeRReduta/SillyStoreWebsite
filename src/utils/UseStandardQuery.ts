import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { SimpleResponse } from "./StandardResponseData";
import getValidBodyOrThrow from "./GetValidBodyOrThrow";
import type { IRequestFnAsync } from "./IRequestFnAsync";

export default function useStandardQuery<TResponseBody>({
    queryKeys,
    requestFnAsync,
}: {
    queryKeys: string[];
    requestFnAsync: IRequestFnAsync<TResponseBody>;
}): UseQueryResult<TResponseBody, Error> {
    return useQuery({
        queryKey: queryKeys,
        queryFn: async (): Promise<TResponseBody> => {
            const simpleResponse: SimpleResponse<TResponseBody> =
                await requestFnAsync();
            return getValidBodyOrThrow(simpleResponse);
        },
        throwOnError: true,
    });
}
