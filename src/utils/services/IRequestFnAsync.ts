import type { SimpleResponse } from "../entities/StandardResponseData";

export type IRequestFnAsync<TResponseBody> = () => Promise<
    SimpleResponse<TResponseBody>
>;
