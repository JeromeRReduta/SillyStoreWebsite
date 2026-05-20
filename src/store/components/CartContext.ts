import { QueryStatus } from "@tanstack/react-query";
import { Context, createContext } from "react";
import { ICartItemResponse } from "../../../SillyStoreCommon/dtos/cartItemDtos";

export interface CartContextValues {
    readonly localCart: Omit<ICartItemResponse, "orderId">[];
    readonly remoteCart?: Omit<ICartItemResponse, "orderId">[];
    readonly status: QueryStatus;
    readonly error: Error | null;
    readonly upsertIntoLocalCart: (
        newItem: Omit<ICartItemResponse, "orderId">,
    ) => void;
    readonly synchronizeCartsAsync: () => Promise<void>;
    readonly purchaseAsync: () => Promise<void>;
    readonly adjustProductQuantity: (productId: number, by: number) => void;

    // readonly updateCartItemQuantity: (cartItem: ICartItemResponse) => void;
    // readonly savePendingCart: () => void;
    // readonly purchase: () => void;
}

const CartContext: Context<CartContextValues | null> =
    createContext<CartContextValues | null>(null);
export default CartContext;
