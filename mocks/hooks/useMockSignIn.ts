import {
    MutationFunctionContext,
    useMutation,
    UseMutationResult,
} from "@tanstack/react-query";
import {
    ICreateUserRequest,
    IGetUserByCredentialsRequest,
    TokenResponse,
} from "../../SillyStoreCommon/dtos/userDtos";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import frontendConfigs from "../../src/configs/FrontendConfigs";
import frontendLogger from "../../src/configs/frontendLogger";
import wasteTime from "../utils/wasteTime";

export default function useMockSignIn(
    method: "LOGIN" | "REGISTER",
): UseMutationResult<
    TokenResponse,
    Error,
    ICreateUserRequest | IGetUserByCredentialsRequest
> {
    const [_cookies, setCookies, _removeCookies] = useCookies<
        "token",
        { token: string }
    >(["token"]);
    const navigate = useNavigate();

    async function mutationFn(
        dto: ICreateUserRequest | IGetUserByCredentialsRequest,
    ): Promise<TokenResponse> {
        const messageHead = method === "LOGIN" ? "Logging in" : "Registering";
        frontendLogger.debug(messageHead, "w/ info", dto, "...");
        await wasteTime(3000);
        return defaultToken;
    }
    return useMutation({
        mutationFn,
    });
}

const defaultToken = "bababooey";
