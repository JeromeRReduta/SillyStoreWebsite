import frontendLogger from "../../configs/frontendLogger";
import type { SimpleResponse } from "../entities/StandardResponseData";

export default function getValidBodyOrThrow<TResponseBody>({
    isError,
    body,
}: SimpleResponse<TResponseBody>): TResponseBody {
    frontendLogger.debug("data found:", { isError, body });
    if (isError) {
        const errorMessage: string = (body as Error).message;
        throw new Error(
            errorMessage !== "" ? errorMessage : "something went wrong!",
        );
    }
    return body as TResponseBody; // safe since we throw in the event of an error (BASED ON CURRENT BACKEND ARCHITECTURE)
}
