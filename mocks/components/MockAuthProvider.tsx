import React from "react";
import MockAuthContext from "../data-storage/MockAuthContext";
import { AuthContextValues } from "../../src/account/data-storage/AuthContext";
import { useCookies } from "react-cookie";
import { useMockLogin, useMockRegister } from "../hooks/useMockSignIn";

export default function MockAuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [cookies, _setCookies, removeCookies] = useCookies<
        "token",
        { token: string }
    >(["token"]);
    const { mutate: register } = useMockRegister();
    const { mutate: login } = useMockLogin();

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
