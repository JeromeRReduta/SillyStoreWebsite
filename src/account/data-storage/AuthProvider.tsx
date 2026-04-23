import type React from "react";
import AuthContext, { type AuthContextValues } from "./AuthContext";
import { useCookies } from "react-cookie";
import { type TokenResponse } from "../../../SillyStoreCommon/dtos/responses/TokenResponse";

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
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
        logout,
    };

    return (
        <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
    );
}
