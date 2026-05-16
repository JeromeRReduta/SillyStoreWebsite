import { useQueryClient } from "@tanstack/react-query";
import React, { JSX } from "react";
import { ICartItemResponse } from "../../SillyStoreCommon/dtos/cartItemDtos";
import frontendConfigs from "../../src/configs/FrontendConfigs";
import frontendLogger from "../../src/configs/frontendLogger";
import { CartContextValues } from "../../src/store/components/CartContext";
import MockCartContext from "../data-storage/MockCartContext";
import useMockFinalizeOrder from "../hooks/useMockFinalizeOrder";
import useMockGetPendingCart from "../hooks/useMockGetPendingCart";
import useMockOverwritePendingCart from "../hooks/useMockOverwritePendingCart";

export default function MockCartProvider({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element {
    const queryClient = useQueryClient();
    const { data, status, error } = useMockGetPendingCart();
    const { mutate: overwritePendingCart } = useMockOverwritePendingCart();
    const { mutate: finalizeOrder } = useMockFinalizeOrder();

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

    function purchase(): void {
        if (data === undefined) {
            frontendLogger.warn("No cart to update!");
            return;
        }
        overwritePendingCart(data);
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
        <MockCartContext.Provider value={values}>
            {children}
        </MockCartContext.Provider>
    );
}
