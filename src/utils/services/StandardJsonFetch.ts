import { TokenResponse } from "../../../SillyStoreCommon/dtos/userDtos";
import frontendLogger from "../../configs/frontendLogger";

export interface IStandardJsonFetchInfo {
    readonly bodyObj?: unknown;
    readonly jwt?: TokenResponse;
    readonly method?: "GET" | "POST" | "PUT" | "DELETE";
    readonly url: string;
}

export default async function standardJsonFetch<TResponseBody = unknown>({
    bodyObj,
    jwt,
    method = "GET",
    url,
}: IStandardJsonFetchInfo): Promise<TResponseBody> {
    // Todo: change this to just get .json()
    const headers: Record<string, string> = createHeaders(jwt);
    const body: string = JSON.stringify(bodyObj);
    frontendLogger.debug(`
            Running standard JSON fetch w/ data:
            Attempting to access: ${url} (${method});
            headers: {
                Content-Type: ${headers["Content-Type"]},
                Token exists?: ${(!!jwt).toString()},
            };
            ${body}
        `);
    const response: Response = await fetch(url, { body, headers, method });
    if (!response.ok) {
        throw new Error("error occurred");
    }
    const json: TResponseBody = (await response.json()) as TResponseBody;
    frontendLogger.debug("json", json);
    return json;
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
