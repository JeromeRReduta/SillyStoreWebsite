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

interface CartProviderParams {
    readonly children: React.ReactNode;
    getPendingCartService: () => Promise<ICartItemResponse[]>;
    overwritePendingCartService: (
        body: OverwritePendingCartBody,
    ) => Promise<void>;
    finalizeOrderService: () => Promise<OrderStatus>;
}

export default function CartProvider({ children }: CartProviderParams) {
    const queryClient = useQueryClient();
    const { data, status, error } = useGetPendingCart();
    const { mutate: overwritePendingCart } = useOverwritePendingCart();
    const { mutate: finalizeOrder } = useFinalizeOrder();

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
        <CartContext.Provider value={values}>{children}</CartContext.Provider>
    );
}
