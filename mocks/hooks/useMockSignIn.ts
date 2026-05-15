import { useMutation, UseMutationResult } from "@tanstack/react-query";
import {
    ICreateUserRequest,
    IGetUserByCredentialsRequest,
    TokenResponse,
} from "../../SillyStoreCommon/dtos/userDtos";
import frontendLogger from "../../src/configs/frontendLogger";
import wasteTime from "../utils/wasteTime";

const defaultToken = "bababooey";

export default function useMockSignIn(
    method: "LOGIN" | "REGISTER",
): UseMutationResult<
    TokenResponse,
    Error,
    ICreateUserRequest | IGetUserByCredentialsRequest
> {
    async function mutationFn(
        dto: ICreateUserRequest | IGetUserByCredentialsRequest,
    ): Promise<TokenResponse> {
        const messageHead = method === "LOGIN" ? "Logging in" : "Registering";
        frontendLogger.debug(messageHead, "w/ info", dto, "...");
        await wasteTime(3000);
        return defaultToken;
    }
    return useMutation({
        mutationFn,
    });
}
