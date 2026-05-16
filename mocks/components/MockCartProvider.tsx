import React, { JSX } from "react";
import MockCartContext from "../data-storage/MockCartContext";
import { CartContextValues } from "../../src/store/components/CartContext";
import { useQueryClient } from "@tanstack/react-query";
import useMockGetPendingCart from "../hooks/useMockGetPendingCart";
import frontendConfigs from "../../src/configs/FrontendConfigs";
import frontendLogger from "../../src/configs/frontendLogger";
import { ICartItemResponse } from "../../SillyStoreCommon/dtos/cartItemDtos";
import useMockOverwritePendingCart from "../hooks/useMockOverwritePendingCart";
import useMockFinalizeOrder from "../hooks/useMockFinalizeOrder";

export default function MockCartProvider({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element {
    const queryClient = useQueryClient();
    const { data, status, error } = useMockGetPendingCart();
    const {
        mutate: overwritePendingCart,
        mutateAsync: overwritePendingCartAsync,
    } = useMockOverwritePendingCart();
    const { mutate: finalizeOrder, mutateAsync: finalizeOrderAsync } =
        useMockFinalizeOrder();

    function updateCartItemQuantity(productId: number, quantity: number) {
        const updateCart = (old: ICartItemResponse[]) =>
            old
                .map((elem) => {
                    if (elem.productId !== productId) {
                        return elem;
                    }
                    if (quantity === 0) {
                        return null;
                    }
                    return { ...elem, quantity };
                })
                .filter((elem: ICartItemResponse | null) => elem !== null);
        queryClient.setQueryData([frontendConfigs.queryKeys.cart], updateCart);
    }
    function savePendingCart(): void {
        if (data === undefined) {
            frontendLogger.warn("No cart to update!");
            return;
        }
        overwritePendingCart(data);
    }

    async function savePendingCartAsync(): Promise<void> {
        if (data === undefined) {
            frontendLogger.warn("No cart to update!");
            return;
        }
        await overwritePendingCartAsync(data);
    }

    function purchase(): void {
        if (data === undefined) {
            frontendLogger.warn("No cart to update!");
            return;
        }
        overwritePendingCart(data);
        finalizeOrder(null);
    }

    async function purchaseAsync(): Promise<void> {
        if (data === undefined) {
            frontendLogger.warn("No cart to update!");
            return;
        }
        await overwritePendingCartAsync(data);
        await finalizeOrderAsync(null);
    }

    const values: CartContextValues = {
        data,
        status,
        error,
        updateCartItemQuantity,
        // savePendingCartAsync,
        // purchaseAsync,
        savePendingCart,
        purchase,
    };
    return (
        <MockCartContext.Provider value={values}>
            {children}
        </MockCartContext.Provider>
    );
}
