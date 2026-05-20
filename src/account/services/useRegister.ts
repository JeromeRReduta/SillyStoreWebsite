import { useMutation, UseMutationResult } from "@tanstack/react-query";
import {
    ICreateUserRequest,
    TokenResponse,
} from "../../../SillyStoreCommon/dtos/userDtos";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import frontendConfigs from "../../configs/FrontendConfigs";

export default function useRegister(
    mutationFn: (dto: ICreateUserRequest) => Promise<TokenResponse>,
): UseMutationResult<TokenResponse, Error, ICreateUserRequest> {
    const [_cookies, setCookies, _removeCookies] = useCookies<
        "token",
        { token: string }
    >(["token"]);
    const navigate = useNavigate();

    function onSuccess(token: TokenResponse): void {
        setCookies("token", token);
        void navigate(frontendConfigs.absolutePaths.internal.store);
    }

    return useMutation({ mutationFn, onSuccess });
}
