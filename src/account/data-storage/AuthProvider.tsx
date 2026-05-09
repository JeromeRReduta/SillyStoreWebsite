import type React from "react";
import AuthContext, { type AuthContextValues } from "./AuthContext";
import { useCookies } from "react-cookie";
import {
    ICreateUserRequest,
    IGetUserByCredentialsRequest,
    TokenResponse,
} from "../../../SillyStoreCommon/dtos/userDtos";
import useLogin from "../services/useLogin";
import useRegister from "../services/useRegister";

export default function AuthProvider({
    children,
    loginService,
    registerService,
}: {
    children: React.ReactNode;
    loginService: (dto: IGetUserByCredentialsRequest) => Promise<TokenResponse>;
    registerService: (dto: ICreateUserRequest) => Promise<TokenResponse>;
}) {
    const { mutateAsync: loginAsync } = useLogin(loginService);
    const { mutateAsync: registerAsync } = useRegister(registerService);
    const [cookies, _setCookies, removeCookies] = useCookies<
        "token",
        { token: TokenResponse }
    >(["token"]);

    function isLoggedIn(): boolean {
        return !!cookies.token;
    }

    function isLoggedOut(): boolean {
        return !isLoggedIn();
    }

    function logout(): void {
        removeCookies("token");
    }

    const values: AuthContextValues = {
        isLoggedIn,
        isLoggedOut,
        registerAsync,
        loginAsync,
        logout,
    };

    return (
        <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
    );
}
