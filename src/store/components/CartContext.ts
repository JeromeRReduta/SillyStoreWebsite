import { QueryStatus } from "@tanstack/react-query";
import { Context, createContext } from "react";
import { ICartItemResponse } from "../../../SillyStoreCommon/dtos/cartItemDtos";

export interface CartContextValues {
    readonly data: ICartItemResponse[] | undefined;
    readonly status: QueryStatus;
    readonly error: Error | null;
    readonly updateCartItemQuantity: (
        productId: number,
        quantity: number,
    ) => void;
    readonly savePendingCart: () => void;
    readonly purchase: () => void;
}

const CartContext: Context<CartContextValues | null> =
    createContext<CartContextValues | null>(null);
export default CartContext;
