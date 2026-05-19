import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { OrderStatus } from "../../../SillyStoreCommon/domain-objects/Order";
import { ICartItemResponse } from "../../../SillyStoreCommon/dtos/cartItemDtos";
import frontendConfigs from "../../configs/FrontendConfigs";
import frontendLogger from "../../configs/frontendLogger";
import useFinalizeOrder from "../services/useFinalizeOrder";
import useGetPendingCart from "../services/useGetPendingCart";
import useOverwritePendingCart, {
    OverwritePendingCartBody,
} from "../services/useOverwritePendingCart";
import CartContext, { CartContextValues } from "./CartContext";

export default function CartProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const queryClient = useQueryClient();
    const { data, status, error } = useGetPendingCart();
    const { mutate: overwritePendingCart } = useOverwritePendingCart();
    const { mutate: finalizeOrder } = useFinalizeOrder();

    function updateCart(newItem: ICartItemResponse): ICartItemResponse[] {
        if (!data) {
            return [newItem];
        }
        const copy = [];
        let found = false;
        for (const oldItem of data) {
            frontendLogger.debug("comparing old", oldItem, "with new", newItem);
            if (oldItem.productId !== newItem.productId) {
                copy.push(oldItem);
                continue;
            }
            found = true;
            if (newItem.quantity > 0) {
                // if we match & have quantity > 0, push cart item w/ updated quantity
                copy.push({ ...oldItem, quantity: newItem.quantity });
            }
            // if we find match and quantity = 0, don't copy cart item
        }
        if (!found) {
            copy.push(newItem);
        }
        return copy;
    }

    function updateCartItemQuantity(newItem: ICartItemResponse): void {
        queryClient.setQueryData(
            [frontendConfigs.queryKeys.cart],
            updateCart(newItem),
        );
        frontendLogger.info(
            "query client is now",
            queryClient.getQueryData([frontendConfigs.queryKeys.cart]),
        );
    }

    function savePendingCart(): void {
        if (data === undefined) {
            frontendLogger.warn("No cart to update!");
            return;
        }
        overwritePendingCart({ cartItems: data });
    }

    function purchase(): void {
        if (data === undefined) {
            frontendLogger.warn("No cart to update!");
            return;
        }
        overwritePendingCart({ cartItems: data });
        finalizeOrder(null);
    }

    const values: CartContextValues = {
        data,
        status,
        error,
        updateCartItemQuantity,
        savePendingCart,
        purchase,
    };

    return (
        <CartContext.Provider value={values}>{children}</CartContext.Provider>
    );
}
