import { useCookies } from "react-cookie";
import { CookieSetOptions } from "universal-cookie";

export interface IWebsiteCookies {
    readonly local_token: string;
    readonly locked_out: string;
}

export default function useWebsiteCookies(): [
    IWebsiteCookies,
    (
        name: keyof IWebsiteCookies,
        value: unknown,
        options?: CookieSetOptions,
    ) => void,
    (name: keyof IWebsiteCookies, options?: CookieSetOptions) => void,
    () => void,
] {
    return useCookies<
        "local_token" | "locked_out",
        {
            local_token: string;
            locked_out: string;
        }
    >(["local_token", "locked_out"]);
}
