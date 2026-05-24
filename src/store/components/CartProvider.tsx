import React, { useState } from "react";
import { ICartItemResponse } from "../../../SillyStoreCommon/dtos/cartItemDtos";
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
    const { data: remoteCart, status, error } = useGetPendingCart();
    const [prevRemoteCart, setPrevRemoteCart] = useState<
        Omit<ICartItemResponse, "orderId">[] | undefined
    >(remoteCart);
    const [localCart, setLocalCart] = useState<
        Omit<ICartItemResponse, "orderId">[]
    >(remoteCart ?? []);
    const { mutateAsync: mergePendingCartAsync } = useMergePendingCart();
    const { mutateAsync: finalizeOrderAsync } = useFinalizeOrder();

    const areCartsEqual: boolean = cartEquals(prevRemoteCart, remoteCart);
    frontendLogger.debug("carts equal?", areCartsEqual);
    if (!areCartsEqual) {
        frontendLogger.debug("sycncing carts");
        setPrevRemoteCart(remoteCart);
        setLocalCart(remoteCart ?? []);
    }

    function cartEquals(
        a?: Omit<ICartItemResponse, "orderId">[],
        b?: Omit<ICartItemResponse, "orderId">[],
    ) {
        if (a === undefined || b === undefined) {
            return a === b;
        }
        if (a.length !== b.length) {
            return false;
        }
        for (let i = 0; i < a.length; i++) {
            if (!cartItemEquals(a[i], b[i])) {
                return false;
            }
        }
        return true;
    }

    function cartItemEquals(
        a?: Omit<ICartItemResponse, "orderId">,
        b?: Omit<ICartItemResponse, "orderId">,
    ): boolean {
        if (a === undefined || b === undefined) {
            return a === b;
        }
        return (
            a.creatorId === b.creatorId &&
            a.productId === b.productId &&
            a.description === b.description &&
            a.imageSrc === b.imageSrc &&
            a.price === b.price &&
            a.quantity === b.quantity &&
            a.title === b.title
        );
    }

    function upsertIntoLocalCart(
        newItem: Omit<ICartItemResponse, "orderId">,
    ): void {
        let found = false;
        const newCart: Omit<ICartItemResponse, "orderId">[] = [];
        for (const item of localCart) {
            if (item.productId !== newItem.productId) {
                frontendLogger.debug("adding item", item);
                frontendLogger.info("Now newcart = ", newCart);
                newCart.push(item);
                continue;
            }
            found = true;
            newCart.push(newItem);
            frontendLogger.debug("adding item", newItem);
            frontendLogger.info("Now newcart = ", newCart);
        }
        if (!found) {
            newCart.push(newItem);
        }
        frontendLogger.debug(found ? "Updated" : "Inserted", "dto:", newItem);
        setLocalCart(newCart);
    }

    /**
     * Precondition: product exists in localcart
     * @param productId
     * @param method
     * @param by
     */
    function adjustProductQuantity(productId: number, by: number) {
        const newCart = localCart
            .map((old) => {
                return old.productId !== productId
                    ? old
                    : { ...old, quantity: old.quantity + by };
            })
            .filter((item) => item.quantity > 0);

        setLocalCart(newCart);
    }

    async function synchronizeCartsAsync(): Promise<void> {
        frontendLogger.debug("LOGGING OUT & Syncing carts");
        await mergePendingCartAsync({ cartItems: localCart });
    }

    async function purchaseAsync(): Promise<void> {
        await synchronizeCartsAsync();
        await finalizeOrderAsync(null);
        setLocalCart([]);
        setPrevRemoteCart([]);
    }

    // Bug: when I log in, make a cart, and purchase - button disables itself. But when I make a cart, log out, log back in, and purchase, state is updated and cart disappears

    const values: CartContextValues = {
        localCart,
        remoteCart,
        status,
        error,
        upsertIntoLocalCart,
        synchronizeCartsAsync,
        purchaseAsync,
        adjustProductQuantity,
    };

    return (
        <CartContext.Provider value={values}>{children}</CartContext.Provider>
    );
}
