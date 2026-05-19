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
import frontendConfigs from "../../configs/FrontendConfigs";
import frontendLogger from "../../configs/frontendLogger";
import standardJsonFetch from "../../utils/services/StandardJsonFetch";
import useWebsiteCookies from "../../utils/services/useWebsiteCookies";

function useSignIn<
    TRequest = ICreateUserRequest | IGetUserByCredentialsRequest,
>(
    method: "LOGIN" | "REGISTER",
): UseMutationResult<TokenResponse, Error, TRequest> {
    const queryClient = useQueryClient();
    const [{ local_token }, setCookie, _removeCookie] = useWebsiteCookies();

    async function mutationFn(dto: TRequest): Promise<TokenResponse> {
        const endpoint =
            method === "LOGIN" ? "/users/login" : "/users/register";
        const url = frontendConfigs.absolutePaths.external.api + endpoint;
        const messageHead = method === "LOGIN" ? "Logging in" : "Registering";
        frontendLogger.debug(messageHead, "w/ info", dto, "...");
        const { tokenResponse }: { tokenResponse: string } =
            await standardJsonFetch({
                bodyObj: dto,
                jwt: local_token,
                method: "POST",
                url,
            });
        await queryClient.invalidateQueries({
            queryKey: [frontendConfigs.queryKeys.cart],
        });
        return tokenResponse;
    }

    function onSuccess(tokenResponse: TokenResponse): void {
        setCookie("local_token", tokenResponse);
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
