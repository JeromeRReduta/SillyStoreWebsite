import { TokenResponse } from "../../../SillyStoreCommon/dtos/userDtos";

export interface IStandardJsonFetchInfo {
    readonly bodyObj?: unknown;
    readonly jwt?: TokenResponse;
    readonly method?: "GET" | "POST" | "PUT" | "DELETE";
    readonly url: string;
}

export default async function standardJsonFetch({
    bodyObj,
    jwt,
    method = "GET",
    url,
}: IStandardJsonFetchInfo): Promise<Response> {
    const headers: Record<string, string> = createHeaders(jwt);
    const body: string = JSON.stringify(bodyObj);
    const response: Response = await fetch(url, { body, headers, method });
    if (!response.ok) {
        throw new Error("Something went wrong!");
    }
    return response;
}

function createHeaders(jwt?: TokenResponse): Record<string, string> {
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };
    if (jwt !== undefined) {
        headers.Authorization = `Bearer ${jwt}`;
    }
    return headers;
}
