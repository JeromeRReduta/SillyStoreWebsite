import React from "react";
import MockAuthContext from "../data-storage/MockAuthContext";
import { AuthContextValues } from "../../src/account/data-storage/AuthContext";
import { useCookies } from "react-cookie";
import { useMockLogin, useMockRegister } from "../hooks/useMockSignIn";
import useMockCart from "../hooks/useMockCart";
import { useQueryClient } from "@tanstack/react-query";
import frontendConfigs from "../../src/configs/FrontendConfigs";

export default function MockAuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const queryClient = useQueryClient();
    const { savePendingCart } = useMockCart();
    const { mutate: register } = useMockRegister();
    const { mutate: login } = useMockLogin();
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
        <MockAuthContext.Provider value={values}>
            {children}
        </MockAuthContext.Provider>
    );
}
