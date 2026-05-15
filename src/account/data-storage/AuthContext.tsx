import { UseMutateFunction } from "@tanstack/react-query";
import { createContext, type Context } from "react";
import {
    ICreateUserRequest,
    IGetUserByCredentialsRequest,
} from "../../../SillyStoreCommon/dtos/userDtos";

export interface AuthContextValues {
    readonly isLoggedIn: () => boolean;
    readonly isLoggedOut: () => boolean;
    readonly logout: () => void;
    readonly register: UseMutateFunction<string, Error, ICreateUserRequest>;
    readonly login: UseMutateFunction<
        string,
        Error,
        IGetUserByCredentialsRequest
    >;
}

const AuthContext: Context<AuthContextValues | null> =
    createContext<AuthContextValues | null>(null);

export default AuthContext;
