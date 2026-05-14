import { Context, createContext } from "react";
import { TokenResponse } from "../../../SillyStoreCommon/dtos/userDtos";

export interface CartContextValues {
    queryPendingCartAsync(token: TokenResponse): Promise<void>;
    updatePendingCartAsync(token: TokenResponse): Promise<void>;
    finalizePurchaseAsync(token: TokenResponse): Promise<void>;
}

const CartContext: Context<CartContextValues | null> =
    createContext<CartContextValues | null>(null);
export default CartContext;
