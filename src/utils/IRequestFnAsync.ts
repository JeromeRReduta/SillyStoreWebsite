import type { SimpleResponse } from "./StandardResponseData";

export type IRequestFnAsync<TResponseBody> = () => Promise<
    SimpleResponse<TResponseBody>
>;
