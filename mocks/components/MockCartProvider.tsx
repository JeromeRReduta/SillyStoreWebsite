import React, { JSX, useEffect, useEffectEvent } from "react";
import MockCartContext from "../data-storage/MockCartContext";
import { CartContextValues } from "../../src/store/components/CartContext";
import {
    MutateOptions,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
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
    const { data, status, error } = useMockGetPendingCart();
    const queryClient = useQueryClient();

    function updateICartItemResponses(
        old: ICartItemResponse[],
        productId: number,
        quantity: number,
    ): ICartItemResponse[] {
        return old
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
    }

    function updateCartItemQuantity(productId: number, quantity: number) {
        queryClient.setQueryData(
            [frontendConfigs.queryKeys.cart],
            (old: ICartItemResponse[]) =>
                updateICartItemResponses(old, productId, quantity),
        );
    }

    const { mutateAsync: overwritePendingCartAsync } =
        useMockOverwritePendingCart();
    const { mutateAsync: finalizeOrderAsync } = useMockFinalizeOrder();

    async function savePendingCartAsync(): Promise<void> {
        if (data === undefined) {
            frontendLogger.warn("No cart to update!");
            return;
        }
        await overwritePendingCartAsync(data);
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
        savePendingCartAsync,
        purchaseAsync,
    };
    return (
        <MockCartContext.Provider value={values}>
            {children}
        </MockCartContext.Provider>
    );
}
