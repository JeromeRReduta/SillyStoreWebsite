import { Context, createContext } from "react";
import { TokenResponse } from "../../../SillyStoreCommon/dtos/userDtos";
import { ICartItemResponse } from "../../../SillyStoreCommon/dtos/cartItemDtos";
import { QueryStatus, UseMutateAsyncFunction } from "@tanstack/react-query";
import { OverwritePendingCartBody } from "../services/useOverwritePendingCart";
import { OrderStatus } from "../../../SillyStoreCommon/domain-objects/Order";

export interface CartContextValues {
    readonly data: ICartItemResponse[] | undefined;
    readonly status: QueryStatus;
    readonly error: Error | null;
    readonly updateCartItemQuantity: (
        productId: number,
        quantity: number,
    ) => void;
    readonly savePendingCartAsync: () => Promise<void>;
    readonly purchaseAsync: () => Promise<void>;
}

const CartContext: Context<CartContextValues | null> =
    createContext<CartContextValues | null>(null);
export default CartContext;
