import {
    useMutation,
    UseMutationResult,
    useQueryClient,
} from "@tanstack/react-query";
import {
    ICreateUserRequest,
    IGetUserByCredentialsRequest,
    TokenResponse,
} from "../../SillyStoreCommon/dtos/userDtos";
import frontendLogger from "../../src/configs/frontendLogger";
import wasteTime from "../utils/wasteTime";
import { useCookies } from "react-cookie";
import frontendConfigs from "../../src/configs/FrontendConfigs";

const mockToken = "bababooey";

function useMockSignIn<
    TRequest = ICreateUserRequest | IGetUserByCredentialsRequest,
>(messageHead: string): UseMutationResult<TokenResponse, Error, TRequest> {
    const queryClient = useQueryClient();
    const [_cookies, setCookies, _removeCookies] = useCookies<
        "token",
        { token: string }
    >(["token"]);

    async function mutationFn(dto: TRequest): Promise<TokenResponse> {
        frontendLogger.debug(messageHead, "w/ info", dto, "...");
        await wasteTime(3000);
        await queryClient.invalidateQueries({
            queryKey: [frontendConfigs.queryKeys.cart],
        });
        return mockToken;
    }

    function onSuccess(token: string): void {
        setCookies("token", token);
    }

    return useMutation({
        mutationFn,
        onSuccess,
    });
}

export function useMockLogin(): UseMutationResult<
    TokenResponse,
    Error,
    IGetUserByCredentialsRequest
> {
    return useMockSignIn<IGetUserByCredentialsRequest>("Logging in");
}

export function useMockRegister(): UseMutationResult<
    TokenResponse,
    Error,
    ICreateUserRequest
> {
    return useMockSignIn<ICreateUserRequest>("Registering");
}
