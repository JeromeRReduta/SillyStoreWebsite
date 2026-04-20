import { useQuery } from "@tanstack/react-query";
import processResponseOrThrow from "./ProcessResponseOrThrow";

export default function useStandardQuery<E>({
    queryKeys,
    requestFnAsync,
}: {
    queryKeys: string[];
    requestFnAsync: () => Promise<Response>;
}) {
    return useQuery({
        queryKey: queryKeys,
        queryFn: async (): Promise<E | undefined> => {
            const response: Response = await requestFnAsync();
            return processResponseOrThrow(response);
        },
    });
}
