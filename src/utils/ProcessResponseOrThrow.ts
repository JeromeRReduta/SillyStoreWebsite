import frontendLogger from "../configs/FrontendLogger";

export default async function processResponseOrThrow<TResponseBody>(
    response: Response,
): Promise<TResponseBody | undefined> {
    frontendLogger.debug("response to process", response);
    const isBodyJson: boolean = /json/.test(
        response.headers.get("Content-Type") ?? "",
    );
    const jsonBody: TResponseBody | Error | undefined = isBodyJson
        ? await response.json()
        : undefined;
    frontendLogger.debug("body (json format) is", jsonBody);
    const hasErrorOccurred: boolean = !response.ok;
    if (hasErrorOccurred) {
        const errorMessage: string =
            (jsonBody as Error).message ?? "Something went wrong!";
        throw new Error(errorMessage);
    }
    return jsonBody as TResponseBody | undefined; // safe since we throw in the event of an error (BASED ON CURRENT BACKEND ARCHITECTURE)
}
