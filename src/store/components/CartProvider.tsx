import React, { useState } from "react";
import { ICartItemResponse } from "../../../SillyStoreCommon/dtos/cartItemDtos";
import { OrderStatus } from "../../../SillyStoreCommon/domain-objects/Order";
import { ICartItem } from "../../../SillyStoreCommon/domain-objects/CartItem";
import CartContext, { CartContextValues } from "./CartContext";
import useGetPendingCart from "../services/useGetPendingCart";
import useOverwritePendingCart, {
    OverwritePendingCartBody,
} from "../services/useOverwritePendingCart";
import useFinalizeOrder from "../services/useFinalizeOrder";

interface CartProviderParams {
    readonly children: React.ReactNode;
    getPendingCartService: () => Promise<ICartItemResponse[]>;
    overwritePendingCartService: (
        body: OverwritePendingCartBody,
    ) => Promise<void>;
    finalizeOrderService: () => Promise<OrderStatus>;
}

export default function CartProvider({
    children,
    getPendingCartService,
    overwritePendingCartService,
    finalizeOrderService,
}: CartProviderParams) {
    const { data: pendingCartItems } = useGetPendingCart(getPendingCartService);
    const { mutateAsync: savePendingCartAsync } = useOverwritePendingCart(
        overwritePendingCartService,
    );
    const { mutateAsync: finalizeOrderAsync } =
        useFinalizeOrder(finalizeOrderService);

    const { mutateAsync: purchaseAsync };
    // todo: mutate async AND query async funcs should be in their own file - then just make own funcs that do onPress = () => await queryAsync() or registerAsync = (info) => await mutateFuncAsync(info)
    // todo: make mockFetch and standardFetch - mockFetch handles all the mocked data stuff, standardFetch deals w/ bearer token, etc.
    async function purchaseAsync(
        items: Pick<ICartItem, "productId" | "quantity">[],
    ): Promise<void> {
        await savePendingCartAsync(items);
        await finalizeOrderAsync("bababooey");
    }

    const values: CartContextValues = {
        pendingCartItems,
        savePendingCartAsync,
        purchaseAsync,
    };
    return (
        <CartContext.Provider value={values}>{children}</CartContext.Provider>
    );
}
