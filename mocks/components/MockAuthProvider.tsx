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
    const [cookies, _setCookies, removeCookies] = useCookies<
        "token",
        { token: string }
    >(["token"]);
    const queryClient = useQueryClient();

    const { savePendingCartAsync } = useMockCart();
    //     const getCartItems = useEffectEvent(
    //         () =>
    //             void (async () => {
    //                 if (!cookies.token) {
    //                     frontendLogger.debug("not logged in - doing nothing");
    //                     return;
    //                 }
    //                 await savePendingCartAsync();
    //                 queryClient.setQueryData(
    //                     [frontendConfigs.queryKeys.cart],
    //                     () => undefined,
    //                 );
    //             })(),
    //     );

    //     useEffect(() => {
    //         getCartItems();
    //     }, [cookies.token]);
    const { mutate: register } = useMockRegister();
    const { mutate: login } = useMockLogin();

    function isLoggedIn(): boolean {
        return !!cookies.token;
    }

    function isLoggedOut(): boolean {
        return !isLoggedIn();
    }

    function logout(): void {
        void (async () => {
            await savePendingCartAsync();
        })();
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
        <MockAuthContext.Provider value={values}>
            {children}
        </MockAuthContext.Provider>
    );
}
