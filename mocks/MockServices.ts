import { ICartItemResponse } from "../SillyStoreCommon/dtos/cartItemDtos";
import { IProductResponse } from "../SillyStoreCommon/dtos/productDtos";
import {
    ICreateUserRequest,
    IGetUserByCredentialsRequest,
    TokenResponse,
} from "../SillyStoreCommon/dtos/userDtos";
import frontendLogger from "../src/configs/frontendLogger";
import mockData from "./MockData";

const delay = 3000;

async function wasteTime(ms: number = delay) {
    // thanks https://stackoverflow.com/questions/14226803/wait-5-seconds-before-executing-next-line
    frontendLogger.debug("Please wait", delay / 1000, "seconds");
    await new Promise((res) => setTimeout(res, ms));
}

async function getCart(token: TokenResponse): Promise<ICartItemResponse[]> {
    frontendLogger.debug("Getting cart w/ token " + token + " ...");
    if (!token) {
        frontendLogger.warn("Not logged in - returning empty arr");
        return [];
    }
    await wasteTime();
    return mockData.cart;
}

async function signIn(
    method: "LOGIN" | "REGISTER",
    dto: IGetUserByCredentialsRequest | ICreateUserRequest,
): Promise<TokenResponse> {
    const messageHead: string =
        method === "LOGIN" ? "Logging in" : "Registering";
    frontendLogger.debug(messageHead, "w/ info", dto, "...");
    await wasteTime();
    return mockData.token;
}

async function getProducts(): Promise<IProductResponse[]> {
    frontendLogger.debug("Getting products...");
    await wasteTime();
    return mockData.products;
}

export default {
    getCart,
    signIn,
    getProducts,
};
