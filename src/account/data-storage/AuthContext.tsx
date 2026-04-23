import { createContext, type Context } from "react";

export interface AuthContextValues {
    readonly isLoggedIn: () => boolean;
    readonly isLoggedOut: () => boolean;
    readonly logout: () => void;
}

const AuthContext: Context<AuthContextValues | null> =
    createContext<AuthContextValues | null>(null);

export default AuthContext;
