import { useQueryClient } from "@tanstack/react-query";
import type React from "react";
import { useCookies } from "react-cookie";
import frontendConfigs from "../../configs/FrontendConfigs";
import useCart from "../../store/services/useCart";
import { useLogin, useRegister } from "../services/useSignIn";
import AuthContext, { type AuthContextValues } from "./AuthContext";

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const queryClient = useQueryClient();
    const { savePendingCart } = useCart();
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

    function logout(): void {
        savePendingCart();
        queryClient.removeQueries({
            queryKey: [frontendConfigs.queryKeys.cart],
            exact: true,
        });
        removeCookies("token");
    }

    const values: AuthContextValues = {
        isLoggedIn,
        isLoggedOut,
        logout,
        register,
        login,
    };

    return (
        <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
    );
}
