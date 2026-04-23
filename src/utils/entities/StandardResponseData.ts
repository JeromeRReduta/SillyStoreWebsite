/**
 * My solution to the following problem:
 * Idk how to mock http requests & responses and atm I don't
 * want to spend extra time learning mock req/res libraries
 *
 * Instead, I isolated the data I actually want from Http responses so I can mock it
 *
 */
export interface SimpleResponse<TResponseBody> {
    readonly isError: boolean;
    readonly body: TResponseBody | Error;
}
