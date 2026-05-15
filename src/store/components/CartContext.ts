import { Context, createContext } from "react";
import { TokenResponse } from "../../../SillyStoreCommon/dtos/userDtos";
import { ICartItemResponse } from "../../../SillyStoreCommon/dtos/cartItemDtos";
import { UseMutateAsyncFunction } from "@tanstack/react-query";
import { OverwritePendingCartBody } from "../services/useOverwritePendingCart";
import { OrderStatus } from "../../../SillyStoreCommon/domain-objects/Order";

export interface CartContextValues {
    readonly pendingCartItems: ICartItemResponse[] | undefined;
    readonly savePendingCartAsync: UseMutateAsyncFunction<
        void,
        Error,
        OverwritePendingCartBody
    >;
    readonly purchaseAsync: UseMutateAsyncFunction<
        OrderStatus,
        Error,
        OverwritePendingCartBody
    >;
}

const CartContext: Context<CartContextValues | null> =
    createContext<CartContextValues | null>(null);
export default CartContext;
