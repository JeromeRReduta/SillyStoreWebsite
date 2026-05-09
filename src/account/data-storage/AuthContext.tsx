import { UseMutateAsyncFunction } from "@tanstack/react-query";
import { createContext, type Context } from "react";
import {
    ICreateUserRequest,
    IGetUserByCredentialsRequest,
    TokenResponse,
} from "../../../SillyStoreCommon/dtos/userDtos";

export interface AuthContextValues {
    isLoggedIn(): boolean;
    isLoggedOut(): boolean;
    readonly registerAsync: UseMutateAsyncFunction<
        TokenResponse,
        Error,
        ICreateUserRequest
    >;
    readonly loginAsync: UseMutateAsyncFunction<
        TokenResponse,
        Error,
        IGetUserByCredentialsRequest
    >;
    logout(): void;
}

const AuthContext: Context<AuthContextValues | null> =
    createContext<AuthContextValues | null>(null);

export default AuthContext;
