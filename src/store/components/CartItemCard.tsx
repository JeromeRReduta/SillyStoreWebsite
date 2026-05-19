import type { JSX } from "react";
import { ICartItem } from "../../../SillyStoreCommon/domain-objects/CartItem";
import ArrowSvg from "../../assets/right-arrow.svg?react";
import css from "../css/cart-item-card.module.css";
import useCart from "../services/useCart";

/**
 *
 * TODO - hooks
 * 0. remote products:
 * * useGetAllProducts {data: remoteProducts}
 * 1. local cookies:
 *  * useJwt => {localToken}
 *      - init state = useSignIn
 *  * useLockedOut => {lockedOut}
 * 2. Remote cookies
 *  * Tanstack fetch cookies - useSignIn
 * 3. Local cart
 *  * useState: localCart (initState = remoteCart)
 * 4. Remote cart
 *  * Tanstack fetch cart - useGetAllPendingCartItems => {data: remoteCart}
 *  * Tanstack fetch cart - useMergePendingCart => {(no data)} (invalidates cart entries (exact = false) so we refetch remotecart data)
 * 5. Remote order
 *  * Tanstack finalize order - useFinalizeOrder => {data: remoteFinalizedOrder}
 *
 *
 *  Can do smth like:
 * 1. CartProvider
 *      effect: when localToken changes, invalidate [cart] entries (not exact)
 *      effect: when remoteCart changes, setLocalCart(remoteCart)
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */

export default function CartItemCard({
    cartItem,
}: {
    cartItem: ICartItem;
}): JSX.Element {
    const {
        imageSrc,
        price,
        productId,
        quantity,
        title,
        orderId,
        description,
    } = cartItem;
    const { updateCartItemQuantity } = useCart();
    return (
        <section className={css.cart_item_card}>
            <div className={css.cart_item_card_img_container}>
                <img
                    className={css.cart_item_card_img}
                    src={imageSrc}
                    alt={title}
                />
            </div>
            <h1 className={css.cart_item_card_title}>{title}</h1>
            <div className={css.cart_item_card_quantity_bar}>
                <div
                    className={css.cart_item_card_decrement_arrow}
                    onClick={() => {
                        updateCartItemQuantity(cartItem);
                    }}
                >
                    <ArrowSvg />
                </div>
                <div className={css.cart_item_card_quantity}>{quantity}</div>
                <div
                    className={css.cart_item_card_increment_arrow}
                    onClick={() => {
                        updateCartItemQuantity(productId, quantity + 1);
                    }}
                >
                    <ArrowSvg />
                </div>
            </div>
            <div className={css.cart_item_card_price}>{price}</div>
        </section>
    );
}
