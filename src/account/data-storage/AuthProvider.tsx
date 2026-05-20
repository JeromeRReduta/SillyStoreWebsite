import { useQueryClient } from "@tanstack/react-query";
import type React from "react";
import frontendConfigs from "../../configs/FrontendConfigs";
import useCart from "../../store/services/useCart";
import useWebsiteCookies from "../../utils/services/useWebsiteCookies";
import { useLogin, useRegister } from "../services/useSignIn";
import AuthContext, { type AuthContextValues } from "./AuthContext";
import frontendLogger from "../../configs/frontendLogger";

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const queryClient = useQueryClient();
    const { synchronizeCartsAsync } = useCart();
    const { mutate: register } = useRegister();
    const { mutate: login } = useLogin();
    const [{ local_token }, _setCookies, removeCookies] = useWebsiteCookies();

    function isLoggedIn(): boolean {
        return !!local_token;
    }

    function isLoggedOut(): boolean {
        return !isLoggedIn();
    }

    async function logoutAsync(): Promise<void> {
        await synchronizeCartsAsync();
        frontendLogger.debug("DONE w/ SYNC");
        queryClient.removeQueries({
            queryKey: [frontendConfigs.queryKeys.cart],
        });
        frontendLogger.debug("REMOVED QUERY");
        removeCookies("local_token");
        frontendLogger.debug("removed token - is now", local_token);
    }

    const values: AuthContextValues = {
        isLoggedIn,
        isLoggedOut,
        logoutAsync,
        register,
        login,
    };

    return (
        <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
    );
}
