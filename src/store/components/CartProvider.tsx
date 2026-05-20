import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useEffectEvent, useState } from "react";
import { OrderStatus } from "../../../SillyStoreCommon/domain-objects/Order";
import { ICartItemResponse } from "../../../SillyStoreCommon/dtos/cartItemDtos";
import frontendConfigs from "../../configs/FrontendConfigs";
import frontendLogger from "../../configs/frontendLogger";
import useFinalizeOrder from "../services/useFinalizeOrder";
import useGetPendingCart from "../services/useGetPendingCart";
import useMergePendingCart from "../services/useMergePendingCartBody";
import CartContext, { CartContextValues } from "./CartContext";

export default function CartProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    // const queryClient = useQueryClient();
    // const { data: remoteCart, status, error } = useGetPendingCart();
    // const [localCart, setLocalCart] = useState<ICartItemResponse[]>([]);
    // const { mutate: overwritePendingCart } = useMergePendingCart();
    // const { mutate: finalizeOrder } = useFinalizeOrder();

    // function updateCart(
    //     cart: ICartItemResponse[],
    //     newItem: ICartItemResponse,
    // ): ICartItemResponse[] {
    //     const newCart: ICartItemResponse[] = [];
    //     let found = false;
    //     for (const item of cart) {
    //         if (item.productId !== newItem.productId) {
    //             newCart.push(item);
    //             continue;
    //         }
    //         found = true;
    //         newCart.push(newItem);
    //     }
    //     if (!found) {
    //         newCart.push(newItem);
    //     }
    //     frontendLogger.debug(found ? "updated" : "inserted", "item:", newItem);
    //     return newCart;
    // }

    // function upsertIntoLocalCart(newItem: ICartItemResponse): void {
    //     setLocalCart((localCart) => updateCart(localCart, newItem));
    // }

    // // function updateCart(newItem: ICartItemResponse): ICartItemResponse[] {
    // //     if (!remoteCart) {
    // //         return [newItem];
    // //     }
    // //     const copy = [];
    // //     let found = false;
    // //     for (const oldItem of remoteCart) {
    // //         frontendLogger.debug("comparing old", oldItem, "with new", newItem);
    // //         if (oldItem.productId !== newItem.productId) {
    // //             copy.push(oldItem);
    // //             continue;
    // //         }
    // //         found = true;
    // //         if (newItem.quantity > 0) {
    // //             // if we match & have quantity > 0, push cart item w/ updated quantity
    // //             copy.push({ ...oldItem, quantity: newItem.quantity });
    // //         }
    // //         // if we find match and quantity = 0, don't copy cart item
    // //     }
    // //     if (!found) {
    // //         copy.push(newItem);
    // //     }
    // //     return copy;
    // // }

    // function updateCartItemQuantity(newItem: ICartItemResponse): void {
    //     queryClient.setQueryData(
    //         [frontendConfigs.queryKeys.cart],
    //         updateCart(newItem),
    //     );
    //     frontendLogger.info(
    //         "query client is now",
    //         queryClient.getQueryData([frontendConfigs.queryKeys.cart]),
    //     );
    // }

    // function savePendingCart(): void {
    //     if (remoteCart === undefined) {
    //         frontendLogger.warn("No cart to update!");
    //         return;
    //     }
    //     overwritePendingCart({ cartItems: remoteCart });
    // }

    // function purchase(): void {
    //     if (remoteCart === undefined) {
    //         frontendLogger.warn("No cart to update!");
    //         return;
    //     }
    //     overwritePendingCart({ cartItems: remoteCart });
    //     finalizeOrder(null);
    // }

    // // const values: CartContextValues = {
    // //     data: remoteCart,
    // //     status,
    // //     error,
    // //     updateCartItemQuantity,
    // //     savePendingCart,
    // //     purchase,
    // // };

    // const values: CartContextValues = {
    //     localCart,
    //     remoteCart,
    //     status,
    //     error,
    //     upsertIntoLocalCart,

    //     purchase,
    //     synchronizeCarts: function (): void {
    //         throw new Error("Function not implemented.");
    //     },
    // };

    const { data: remoteCart, status, error, refetch } = useGetPendingCart();
    const [localCart, setLocalCart] = useState<ICartItemResponse[]>([]);
    const { mutate: mergePendingCart } = useMergePendingCart();
    const { mutate: finalizeOrder } = useFinalizeOrder();
    const queryClient = useQueryClient();

    function upsertIntoLocalCart(newItem: ICartItemResponse): void {
        let found = false;
        const newCart: ICartItemResponse[] = [];
        for (const item of localCart) {
            if (item.productId !== newItem.productId) {
                newCart.push(item);
                continue;
            }
            found = true;
            newCart.push(newItem);
        }
        frontendLogger.debug(found ? "Updated" : "Inserted", "dto:", newItem);
        setLocalCart(newCart);
    }

    async function synchronizeCartsAsync(): Promise<void> {
        mergePendingCart({ cartItems: localCart });
        await queryClient.invalidateQueries({
            queryKey: [frontendConfigs.queryKeys.cart],
        });
        setLocalCart(remoteCart ?? []);
    }

    async function purchaseAsync(): Promise<void> {
        await synchronizeCartsAsync();
        finalizeOrder(null);
    }

    const values: CartContextValues = {
        localCart,
        remoteCart,
        status,
        error,
        upsertIntoLocalCart,
        synchronizeCartsAsync,
        purchaseAsync,
    };

    return (
        <CartContext.Provider value={values}>{children}</CartContext.Provider>
    );
}
