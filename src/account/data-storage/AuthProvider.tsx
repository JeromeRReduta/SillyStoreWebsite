import type React from "react";
import AuthContext, { type AuthContextValues } from "./AuthContext";
import { useCookies } from "react-cookie";
import {
    ICreateUserRequest,
    IGetUserByCredentialsRequest,
    TokenResponse,
} from "../../../SillyStoreCommon/dtos/userDtos";
import { MutateOptions, useQueryClient } from "@tanstack/react-query";
import useCart from "../../store/services/useCart";
import frontendConfigs from "../../configs/FrontendConfigs";
import { useLogin, useRegister } from "../services/useSignIn";

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const queryClient = useQueryClient();
    // const { savePendingCart } = useCart();
    const { mutate: register } = useRegister();
    const { mutate: login } = useLogin();
    const [cookies, _setCookies, removeCookies] = useCookies<
        "token",
        { token: string }
    >(["token"]);

    function isLoggedIn(): boolean {
        return !!cookies.token;
    }

    function isLoggedOut(): boolean {
        return !isLoggedIn();
    }

    // function logout(): void {
    //     savePendingCart();
    //     queryClient.removeQueries({
    //         queryKey: [frontendConfigs.queryKeys.cart],
    //         exact: true,
    //     });
    //     removeCookies("token");
    // }

    const values: AuthContextValues = {
        isLoggedIn,
        isLoggedOut,
        logout: function (): void {
            throw new Error("Function not implemented.");
        },
        register,
        login,
    };

    return (
        <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
    );
}
