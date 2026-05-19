import {
    useMutation,
    UseMutationResult,
    useQueryClient,
} from "@tanstack/react-query";
import {
    ICreateUserRequest,
    IGetUserByCredentialsRequest,
    TokenResponse,
} from "../../../SillyStoreCommon/dtos/userDtos";
import { useCookies } from "react-cookie";
import frontendLogger from "../../configs/frontendLogger";
import frontendConfigs from "../../configs/FrontendConfigs";
import standardJsonFetch from "../../utils/services/StandardJsonFetch";

function useSignIn<
    TRequest = ICreateUserRequest | IGetUserByCredentialsRequest,
>(
    method: "LOGIN" | "REGISTER",
): UseMutationResult<TokenResponse, Error, TRequest> {
    const queryClient = useQueryClient();
    const [cookies, setCookies, _removeCookies] = useCookies<
        "token",
        { token: string }
    >(["token"]);

    async function mutationFn(dto: TRequest): Promise<TokenResponse> {
        const endpoint =
            method === "LOGIN" ? "/users/login" : "/users/register";
        const url = frontendConfigs.absolutePaths.external.api + endpoint;
        const messageHead = method === "LOGIN" ? "Logging in" : "Registering";
        frontendLogger.debug(messageHead, "w/ info", dto, "...");
        const { token }: { token: string } = await standardJsonFetch({
            bodyObj: dto,
            jwt: cookies.token,
            method: "POST",
            url,
        });
        await queryClient.invalidateQueries({
            queryKey: [frontendConfigs.queryKeys.cart],
        });
        return token;
    }

    function onSuccess(token: string): void {
        setCookies("token", token);
    }

    return useMutation({
        mutationFn,
        onSuccess,
    });
}

export function useRegister(): UseMutationResult<
    TokenResponse,
    Error,
    ICreateUserRequest
> {
    return useSignIn<ICreateUserRequest>("REGISTER");
}

export function useLogin(): UseMutationResult<
    TokenResponse,
    Error,
    IGetUserByCredentialsRequest
> {
    return useSignIn<IGetUserByCredentialsRequest>("LOGIN");
}
